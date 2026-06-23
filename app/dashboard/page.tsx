import { createClient } from '@/lib/supabase';
import RecentInvoices from './RecentInvoices';

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  let invoices: any[] = [];
  if (user) {
    const { data } = await supabase
      .from('invoices')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });
    
    invoices = data || [];
  }

  const overdueInvoices = invoices.filter(i => i.status === 'overdue');
  const totalAtRisk = overdueInvoices.reduce((sum, i) => sum + i.amount, 0);
  const recovered = invoices.filter(i => i.status === 'paid').reduce((sum, i) => sum + i.amount, 0);
  const relancesSent = invoices.reduce((sum, i) => sum + (i.relance_level || 0), 0);

  return (
    <div>
      {/* Header */}
      <div className="top-header">
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.02em' }}>Tableau de bord</h1>
          <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 2 }}>Lundi 23 juin 2026 · Bonjour 👋</p>
        </div>
        <a
          className="btn btn-primary btn-sm"
          href="/dashboard/factures/nouvelle"
          id="btn-add-invoice-header"
          style={{ textDecoration: 'none' }}
        >
          + Ajouter une facture
        </a>
      </div>

      <div className="page-content">
        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 32 }}>
          {[
            { label: 'Factures en retard', value: overdueInvoices.length.toString(), color: '#ef4444', bg: 'rgba(239,68,68,0.1)', icon: '⚠️' },
            { label: 'Montant en risque', value: `${totalAtRisk.toLocaleString('fr-FR')}€`, color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', icon: '💸' },
            { label: 'Récupéré ce mois', value: `${recovered.toLocaleString('fr-FR')}€`, color: '#10b981', bg: 'rgba(16,185,129,0.1)', icon: '💰' },
            { label: 'Relances envoyées', value: relancesSent.toString(), color: '#6366f1', bg: 'rgba(99,102,241,0.1)', icon: '📨' },
          ].map(stat => (
            <div key={stat.label} className="card" style={{ background: stat.bg, border: `1px solid ${stat.color}22` }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>{stat.icon}</div>
              <div className="stat-value" style={{ color: stat.color, marginBottom: 4 }}>{stat.value}</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 700 }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* ROI Banner */}
        <div style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.1), rgba(16,185,129,0.05))', border: '1px solid rgba(16,185,129,0.3)', borderRadius: 14, padding: '16px 24px', marginBottom: 32, display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ fontSize: 28 }}>🏆</span>
          <div>
            <div style={{ fontWeight: 700, color: '#10b981', fontSize: 15 }}>RelancePro vous a aidé à récupérer {recovered.toLocaleString('fr-FR')}€ ce mois-ci</div>
            <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 2 }}>Soit {Math.round(recovered / 19)} mois d&apos;abonnement couverts par votre ROI.</div>
          </div>
        </div>

        {/* Invoice Table */}
        <RecentInvoices initialInvoices={invoices} />

        {/* Quick actions */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16, marginTop: 24 }}>
          <a href="/dashboard/factures/nouvelle" className="card glass-hover" style={{ cursor: 'pointer', textDecoration: 'none', color: 'inherit' }}>
            <div style={{ fontSize: 28, marginBottom: 12 }}>📄</div>
            <div style={{ fontWeight: 700, marginBottom: 4 }}>Ajouter une facture</div>
            <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>Configurez les relances automatiques en 2 min</div>
          </a>
          <a href="/outils/generateur-relance" className="card glass-hover" style={{ cursor: 'pointer', textDecoration: 'none', color: 'inherit' }}>
            <div style={{ fontSize: 28, marginBottom: 12 }}>✍️</div>
            <div style={{ fontWeight: 700, marginBottom: 4 }}>Générateur de lettre</div>
            <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>Créez une lettre de relance personnalisée</div>
          </a>
          <div className="card glass-hover" style={{ cursor: 'pointer' }}>
            <div style={{ fontSize: 28, marginBottom: 12 }}>📊</div>
            <div style={{ fontWeight: 700, marginBottom: 4 }}>Rapport mensuel</div>
            <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>Téléchargez votre rapport de recouvrement PDF</div>
          </div>
        </div>
      </div>
    </div>
  );
}
