'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase-client';

export default function NouvelleFacturePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    invoice_number: '',
    client_name: '',
    client_email: '',
    amount: '',
    due_date: '',
    description: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const supabase = createClient();
      
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Non autorisé");

      const { error: dbError } = await supabase
        .from('invoices')
        .insert({
          user_id: user.id,
          invoice_number: formData.invoice_number,
          client_name: formData.client_name,
          client_email: formData.client_email,
          amount: parseFloat(formData.amount),
          due_date: formData.due_date,
          description: formData.description,
          status: new Date(formData.due_date) < new Date() ? 'overdue' : 'pending'
        });

      if (dbError) throw dbError;

      router.push('/dashboard');
      router.refresh();
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Une erreur est survenue lors de la création de la facture.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="top-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <Link href="/dashboard" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: 13 }}>Tableau de bord</Link>
            <span style={{ color: 'var(--border)', fontSize: 12 }}>/</span>
            <span style={{ color: 'var(--text-secondary)', fontSize: 13 }}>Nouvelle facture</span>
          </div>
          <h1 style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.02em' }}>Ajouter une facture à relancer</h1>
        </div>
      </div>

      <div className="page-content" style={{ maxWidth: 800 }}>
        {error && (
          <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 10, padding: '12px 16px', marginBottom: 24, fontSize: 14, color: '#ef4444' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="card">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
            {/* Informations Client */}
            <div>
              <h2 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16, color: 'var(--text-primary)' }}>Client</h2>
              <div style={{ marginBottom: 16 }}>
                <label className="label" htmlFor="client_name">Nom du client ou entreprise</label>
                <input id="client_name" name="client_name" type="text" className="input" placeholder="Acme Corp" required value={formData.client_name} onChange={handleChange} />
              </div>
              <div>
                <label className="label" htmlFor="client_email">Email de contact (pour la relance)</label>
                <input id="client_email" name="client_email" type="email" className="input" placeholder="compta@acme.com" required value={formData.client_email} onChange={handleChange} />
              </div>
            </div>

            {/* Informations Facture */}
            <div>
              <h2 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16, color: 'var(--text-primary)' }}>Détails de la facture</h2>
              <div style={{ marginBottom: 16, display: 'flex', gap: 16 }}>
                <div style={{ flex: 1 }}>
                  <label className="label" htmlFor="invoice_number">N° de facture</label>
                  <input id="invoice_number" name="invoice_number" type="text" className="input" placeholder="FAC-2026-042" required value={formData.invoice_number} onChange={handleChange} />
                </div>
                <div style={{ flex: 1 }}>
                  <label className="label" htmlFor="amount">Montant TTC (€)</label>
                  <input id="amount" name="amount" type="number" step="0.01" min="1" className="input" placeholder="1500.00" required value={formData.amount} onChange={handleChange} />
                </div>
              </div>
              <div style={{ marginBottom: 16 }}>
                <label className="label" htmlFor="due_date">Date d'échéance (limite de paiement)</label>
                <input id="due_date" name="due_date" type="date" className="input" required value={formData.due_date} onChange={handleChange} />
              </div>
            </div>
          </div>

          <div style={{ marginBottom: 32 }}>
            <label className="label" htmlFor="description">Description (Optionnel)</label>
            <textarea id="description" name="description" className="input" placeholder="Prestation de design web..." rows={2} style={{ resize: 'vertical' }} value={formData.description} onChange={handleChange} />
          </div>

          <div className="divider" style={{ margin: '0 -24px 24px -24px' }} />

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
            <Link href="/dashboard" className="btn btn-secondary">Annuler</Link>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Création...' : 'Créer et activer la relance'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
