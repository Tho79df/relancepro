'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function ParametresPage() {
  const [profile, setProfile] = useState({
    name: 'Marie Dupont',
    email: 'marie@exemple.fr',
    company: 'Marie Dupont Consulting',
    siret: '123 456 789 00012',
    address: '12 rue de la Paix, 75001 Paris',
  });

  const [saved, setSaved] = useState(false);
  const handlePortal = () => {
    alert("Le portail client Stripe sera bientôt disponible pour gérer votre abonnement.");
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
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <div className="badge badge-info" style={{ fontSize: 14, padding: '6px 14px' }}>Plan Pro</div>
                <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>Essai gratuit</span>
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                <button onClick={handlePortal} className="btn btn-secondary btn-sm" id="btn-change-plan">Gérer mon abonnement</button>
              </div>
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
