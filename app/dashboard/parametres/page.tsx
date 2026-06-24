'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePlan } from '@/lib/use-plan';

const PLAN_LABELS: Record<string, { label: string; color: string; bg: string }> = {
  starter: { label: 'Plan Starter', color: '#f59e0b', bg: 'rgba(245,158,11,0.15)' },
  pro: { label: 'Plan Pro', color: '#818cf8', bg: 'rgba(99,102,241,0.15)' },
  studio: { label: 'Plan Studio', color: '#a855f7', bg: 'rgba(168,85,247,0.15)' },
  none: { label: 'Aucun plan actif', color: '#ef4444', bg: 'rgba(239,68,68,0.1)' },
};

const STATUS_LABELS: Record<string, string> = {
  active: 'Actif',
  trialing: 'Essai gratuit',
  past_due: 'Paiement en retard',
  canceled: 'Annulé',
  none: 'Inactif',
};

export default function ParametresPage() {
  const { plan, subscriptionStatus, maxInvoices, maxRelanceLevels, loading: planLoading } = usePlan();
  const [profile, setProfile] = useState({
    name: 'Marie Dupont',
    email: 'marie@exemple.fr',
    company: 'Marie Dupont Consulting',
    siret: '123 456 789 00012',
    address: '12 rue de la Paix, 75001 Paris',
  });

  const [saved, setSaved] = useState(false);
  const handlePortal = async () => {
    try {
      const res = await fetch('/api/stripe/portal', { method: 'POST' });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else alert('Impossible d\'ouvrir le portail. Veuillez réessayer.');
    } catch {
      alert('Erreur réseau. Veuillez réessayer.');
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div>
      <div className="top-header">
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.02em' }}>Paramètres</h1>
          <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 2 }}>Gérez votre profil et votre abonnement</p>
        </div>
      </div>

      <div className="page-content">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, maxWidth: 900 }}>
          {/* Profile */}
          <div className="card" style={{ padding: 28 }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 24 }}>Profil & informations légales</h2>
            <form onSubmit={handleSave}>
              <div style={{ display: 'grid', gap: 16 }}>
                <div>
                  <label className="label" htmlFor="param-name">Nom complet</label>
                  <input id="param-name" className="input" value={profile.name} onChange={e => setProfile({...profile, name: e.target.value})} />
                </div>
                <div>
                  <label className="label" htmlFor="param-email">Email</label>
                  <input id="param-email" type="email" className="input" value={profile.email} onChange={e => setProfile({...profile, email: e.target.value})} />
                </div>
                <div>
                  <label className="label" htmlFor="param-company">Nom de l&apos;entreprise</label>
                  <input id="param-company" className="input" placeholder="Auto-entrepreneur, SARL..." value={profile.company} onChange={e => setProfile({...profile, company: e.target.value})} />
                </div>
                <div>
                  <label className="label" htmlFor="param-siret">SIRET</label>
                  <input id="param-siret" className="input" placeholder="123 456 789 00012" value={profile.siret} onChange={e => setProfile({...profile, siret: e.target.value})} />
                </div>
                <div>
                  <label className="label" htmlFor="param-address">Adresse</label>
                  <input id="param-address" className="input" value={profile.address} onChange={e => setProfile({...profile, address: e.target.value})} />
                </div>
                <button type="submit" className="btn btn-primary btn-sm" id="btn-save-profile">
                  {saved ? '✓ Enregistré !' : 'Enregistrer les modifications'}
                </button>
              </div>
            </form>
          </div>

          {/* Subscription */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div className="card" style={{ padding: 28, background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)' }}>
              <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Mon abonnement</h2>
              {planLoading ? (
                <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>Chargement...</div>
              ) : (
                <>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
                    <span style={{
                      padding: '5px 14px', borderRadius: 100, fontSize: 13, fontWeight: 700,
                      background: PLAN_LABELS[plan]?.bg,
                      color: PLAN_LABELS[plan]?.color,
                    }}>
                      {PLAN_LABELS[plan]?.label || 'Inconnu'}
                    </span>
                    <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                      {STATUS_LABELS[subscriptionStatus] || subscriptionStatus}
                    </span>
                  </div>
                  <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 16, lineHeight: 1.7 }}>
                    📎 Factures : <strong>{maxInvoices === -1 ? 'Illimitées' : `${maxInvoices} max`}</strong>
                    <br />
                    📧 Niveaux de relance : <strong>{maxRelanceLevels === 0 ? 'Aucun' : `${maxRelanceLevels} niveaux`}</strong>
                  </div>
                  <div style={{ display: 'flex', gap: 12 }}>
                    <button onClick={handlePortal} className="btn btn-secondary btn-sm" id="btn-change-plan">Gérer mon abonnement (Stripe)</button>
                  </div>
                  {plan === 'starter' && (
                    <div style={{ marginTop: 16, padding: '10px 14px', background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)', borderRadius: 10, fontSize: 13 }}>
                      🚀 <strong style={{ color: '#818cf8' }}>Passez au Pro (19€/mois)</strong> pour des factures illimitées + la mise en demeure PDF.
                    </div>
                  )}
                </>
              )}
            </div>

            <div className="card" style={{ padding: 28 }}>
              <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Configuration email</h2>
              <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 16 }}>
                Les relances seront envoyées depuis l&apos;adresse ci-dessous. Configurez votre email expéditeur.
              </p>
              <div>
                <label className="label" htmlFor="param-from-email">Email expéditeur</label>
                <input id="param-from-email" type="email" className="input" placeholder="vous@exemple.fr" defaultValue="marie@exemple.fr" />
              </div>
              <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 8 }}>
                💡 Pour une délivrabilité optimale, utilisez votre propre domaine.
              </p>
            </div>

            <div className="card" style={{ padding: 28, border: '1px solid rgba(239,68,68,0.2)', background: 'rgba(239,68,68,0.05)' }}>
              <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#ef4444' }}>Zone danger</h2>
              <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 16 }}>
                La suppression de votre compte est irréversible et effacera toutes vos données.
              </p>
              <button className="btn btn-sm" style={{ background: 'rgba(239,68,68,0.15)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.3)' }} id="btn-delete-account">
                Supprimer mon compte
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
