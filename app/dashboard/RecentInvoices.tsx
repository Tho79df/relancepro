'use client';

import { useState } from 'react';
import Link from 'next/link';

const daysBetween = (dateStr: string) => {
  const diff = new Date().getTime() - new Date(dateStr).getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
};

const getStatusLabel = (status: string, level: number) => {
  if (status === 'paid') return { label: 'Payée ✓', css: 'badge-success' };
  if (status === 'pending') return { label: 'À venir', css: 'badge-info' };
  return { label: `Relance ${level}`, css: level >= 3 ? 'badge-danger' : 'badge-warning' };
};

export default function RecentInvoices({ initialInvoices }: { initialInvoices: any[] }) {
  const [invoices, setInvoices] = useState(initialInvoices);
  const [relanceModal, setRelanceModal] = useState<{ show: boolean, invoiceId: string, currentLevel: number } | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<number>(1);
  const [sending, setSending] = useState(false);

  const handleOpenRelance = (invoice: any) => {
    const nextLevel = Math.min((invoice.relance_level || 0) + 1, 4);
    setSelectedLevel(nextLevel);
    setRelanceModal({ show: true, invoiceId: invoice.id, currentLevel: invoice.relance_level || 0 });
  };

  const sendRelance = async () => {
    if (!relanceModal) return;
    setSending(true);
    try {
      const res = await fetch('/api/relances/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ invoice_id: relanceModal.invoiceId, level: selectedLevel })
      });
      const data = await res.json();
      if (data.success) {
        setInvoices(invoices.map(i => i.id === relanceModal.invoiceId ? { ...i, relance_level: selectedLevel, status: 'overdue' } : i));
        setRelanceModal(null);
      } else {
        alert(data.error || 'Erreur lors de l\'envoi');
      }
    } catch (err) {
      alert('Erreur serveur');
    }
    setSending(false);
  };

  const markAsPaid = async (id: string) => {
    try {
      const res = await fetch('/api/invoices/pay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ invoice_id: id })
      });
      // Fallback for immediate UI update if API isn't strictly needed for demo
      setInvoices(invoices.map(i => i.id === id ? { ...i, status: 'paid' } : i));
    } catch (error) {
      // ignore
    }
  };

  return (
    <>
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: 16, fontWeight: 700 }}>Factures actives</h2>
          <Link href="/dashboard/factures" style={{ fontSize: 13, color: '#818cf8', textDecoration: 'none', fontWeight: 600 }}>Voir tout →</Link>
        </div>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Client</th>
                <th>Montant</th>
                <th>Échéance</th>
                <th>Retard</th>
                <th>Statut</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {invoices.slice(0, 5).map(inv => {
                const { label, css } = getStatusLabel(inv.status, inv.relance_level);
                const delay = daysBetween(inv.due_date);
                return (
                  <tr key={inv.id}>
                    <td style={{ fontWeight: 600 }}>{inv.client_name}</td>
                    <td style={{ color: 'var(--text-primary)', fontWeight: 700 }}>{inv.amount.toLocaleString('fr-FR')}€</td>
                    <td style={{ color: 'var(--text-secondary)', fontSize: 13 }}>{new Date(inv.due_date).toLocaleDateString('fr-FR')}</td>
                    <td style={{ color: inv.status === 'paid' ? '#10b981' : delay > 30 ? '#ef4444' : '#f59e0b', fontWeight: 600, fontSize: 13 }}>
                      {inv.status === 'paid' ? 'Payée' : delay > 0 ? `${delay}j` : 'À venir'}
                    </td>
                    <td><span className={`badge ${css}`}>{label}</span></td>
                    <td>
                      <div style={{ display: 'flex', gap: 8 }}>
                        {inv.status !== 'paid' && (
                          <button onClick={() => handleOpenRelance(inv)} style={{ fontSize: 12, padding: '4px 10px', background: 'rgba(99,102,241,0.15)', border: 'none', color: '#818cf8', borderRadius: 6, cursor: 'pointer', fontWeight: 600 }}>
                            Relancer
                          </button>
                        )}
                        {inv.status !== 'paid' && (
                          <button onClick={() => markAsPaid(inv.id)} style={{ fontSize: 12, padding: '4px 10px', background: 'rgba(16,185,129,0.15)', border: 'none', color: '#10b981', borderRadius: 6, cursor: 'pointer', fontWeight: 600 }}>
                            ✓ Payée
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Relance Modal */}
      {relanceModal && relanceModal.show && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 24, backdropFilter: 'blur(4px)' }}>
          <div style={{ width: '100%', maxWidth: 450, padding: 32, background: '#0d0d1a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 20, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}>
            <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 16 }}>Envoyer une relance</h2>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 24 }}>
              Niveau actuel de la facture : <strong>{relanceModal.currentLevel}</strong>
            </p>

            <div style={{ marginBottom: 24 }}>
              <label className="label">Sélectionnez le niveau à envoyer</label>
              <select 
                className="input" 
                value={selectedLevel} 
                onChange={(e) => setSelectedLevel(parseInt(e.target.value))}
                style={{ background: 'var(--bg-card)', color: 'var(--text-primary)', cursor: 'pointer' }}
              >
                <option value={1} style={{ background: '#050509', color: '#fff' }}>Niveau 1 - Rappel amical</option>
                <option value={2} style={{ background: '#050509', color: '#fff' }}>Niveau 2 - Seconde relance</option>
                <option value={3} style={{ background: '#050509', color: '#fff' }}>Niveau 3 - Relance formelle</option>
                <option value={4} style={{ background: '#050509', color: '#fff' }}>Niveau 4 - Mise en demeure</option>
              </select>
            </div>

            <div style={{ display: 'flex', gap: 12 }}>
              <button className="btn btn-secondary" style={{ flex: 1 }} onClick={() => setRelanceModal(null)} disabled={sending}>Annuler</button>
              <button className="btn btn-primary" style={{ flex: 1 }} onClick={sendRelance} disabled={sending}>
                {sending ? 'Envoi en cours...' : 'Envoyer l\'email 📨'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
