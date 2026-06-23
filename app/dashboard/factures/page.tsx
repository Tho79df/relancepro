'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase-client';
import Link from 'next/link';

export default function FacturesPage() {
  const [invoices, setInvoices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'overdue' | 'pending' | 'paid'>('all');
  
  // Relance modal state
  const [relanceModal, setRelanceModal] = useState<{ show: boolean, invoiceId: string, currentLevel: number } | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<number>(1);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    async function loadInvoices() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from('invoices')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });
        if (data) setInvoices(data);
      }
      setLoading(false);
    }
    loadInvoices();
  }, []);

  const filtered = filter === 'all' ? invoices : invoices.filter(i => i.status === filter);

  const markAsPaid = async (id: string) => {
    const supabase = createClient();
    const { error } = await supabase.from('invoices').update({ status: 'paid' }).eq('id', id);
    if (!error) {
      setInvoices(invoices.map(i => i.id === id ? { ...i, status: 'paid' } : i));
    } else {
      alert("Erreur lors de la mise à jour");
    }
  };

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
        // Update local state
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

  return (
    <div>
      <div className="top-header">
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.02em' }}>Mes factures</h1>
          <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 2 }}>{invoices.length} facture(s) · {invoices.filter(i => i.status === 'overdue').length} en retard</p>
        </div>
        <Link href="/dashboard/factures/nouvelle" className="btn btn-primary btn-sm" id="btn-add-invoice" style={{ textDecoration: 'none' }}>+ Nouvelle facture</Link>
      </div>

      <div className="page-content">
        {/* Filter tabs */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
          {[{ key: 'all', label: 'Toutes' }, { key: 'overdue', label: '🔴 En retard' }, { key: 'pending', label: '🟡 À venir' }, { key: 'paid', label: '🟢 Payées' }].map(f => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key as 'all' | 'overdue' | 'pending' | 'paid')}
              style={{
                padding: '8px 16px', borderRadius: 10, border: '1px solid',
                borderColor: filter === f.key ? '#6366f1' : 'var(--border)',
                background: filter === f.key ? 'rgba(99,102,241,0.15)' : 'var(--bg-card)',
                color: filter === f.key ? '#818cf8' : 'var(--text-secondary)',
                fontSize: 13, fontWeight: 600, cursor: 'pointer',
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Client</th>
                  <th>Description</th>
                  <th>Montant</th>
                  <th>Échéance</th>
                  <th>Statut</th>
                  <th>Relance</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(inv => (
                  <tr key={inv.id}>
                    <td>
                      <div style={{ fontWeight: 700 }}>{inv.client_name}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{inv.client_email}</div>
                    </td>
                    <td style={{ fontSize: 13, color: 'var(--text-secondary)', maxWidth: 200 }}>{inv.description}</td>
                    <td style={{ fontWeight: 800, fontSize: 16 }}>{inv.amount.toLocaleString('fr-FR')}€</td>
                    <td style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{new Date(inv.due_date).toLocaleDateString('fr-FR')}</td>
                    <td>
                      <span className={`badge ${inv.status === 'paid' ? 'badge-success' : inv.status === 'overdue' ? 'badge-danger' : 'badge-warning'}`}>
                        {inv.status === 'paid' ? '✓ Payée' : inv.status === 'overdue' ? 'En retard' : 'À venir'}
                      </span>
                    </td>
                    <td>
                      {inv.status !== 'paid' ? (
                        <span className={`badge ${(inv.relance_level || 0) >= 3 ? 'badge-danger' : 'badge-info'}`}>
                          Niveau {inv.relance_level || 0}/5
                        </span>
                      ) : <span style={{ color: 'var(--text-muted)', fontSize: 13 }}>—</span>}
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: 8 }}>
                        {inv.status !== 'paid' && (
                          <button onClick={() => handleOpenRelance(inv)} style={{ fontSize: 12, padding: '5px 12px', background: 'rgba(99,102,241,0.15)', border: 'none', color: '#818cf8', borderRadius: 6, cursor: 'pointer', fontWeight: 600 }}>
                            Relancer
                          </button>
                        )}
                        {inv.status !== 'paid' && (
                          <button onClick={() => markAsPaid(inv.id)} style={{ fontSize: 12, padding: '5px 12px', background: 'rgba(16,185,129,0.15)', border: 'none', color: '#10b981', borderRadius: 6, cursor: 'pointer', fontWeight: 600 }}>✓ Payée</button>
                        )}
                        <button style={{ fontSize: 12, padding: '5px 12px', background: 'rgba(239,68,68,0.1)', border: 'none', color: '#ef4444', borderRadius: 6, cursor: 'pointer', fontWeight: 600 }}>🗑</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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

    </div>
  );
}
