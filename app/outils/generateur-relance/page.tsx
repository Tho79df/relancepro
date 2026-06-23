'use client';
import { useState } from 'react';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import Link from 'next/link';

const TEMPLATES: Record<number, (d: Record<string, string>) => string> = {
  1: (d) =>
    `Bonjour ${d.clientPrenom || '[Prénom]'},

J'espère que tout va bien ! Je me permets de vous rappeler que la facture n°${d.numFacture || '[NUMÉRO]'} d'un montant de ${d.montant || '[MONTANT]'}€ TTC, datée du ${d.dateFacture || '[DATE FACTURE]'}, est arrivée à échéance le ${d.dateEcheance || '[DATE ÉCHÉANCE]'}.

Si le règlement a déjà été effectué, veuillez ignorer ce message. Dans le cas contraire, pourriez-vous me confirmer la date de paiement prévue ?

Bien cordialement,
${d.votreNom || '[Votre nom]'}`,

  2: (d) =>
    `Bonjour ${d.clientPrenom || '[Prénom]'},

Sauf erreur de ma part, la facture n°${d.numFacture || '[NUMÉRO]'} d'un montant de ${d.montant || '[MONTANT]'}€ TTC dont l'échéance était fixée au ${d.dateEcheance || '[DATE ÉCHÉANCE]'} reste à ce jour impayée.

Je vous serais reconnaissant(e) de bien vouloir procéder au règlement dans les meilleurs délais, ou de me contacter si vous rencontrez une difficulté particulière.

Bien cordialement,
${d.votreNom || '[Votre nom]'}

RIB disponible sur demande.`,

  3: (d) =>
    `Madame, Monsieur,

Malgré mes relances précédentes, la facture n°${d.numFacture || '[NUMÉRO]'} d'un montant de ${d.montant || '[MONTANT]'}€ TTC reste impayée à ce jour.

Je vous informe qu'en application de l'article L441-6 du Code de commerce, des pénalités de retard sont applicables au taux légal en vigueur. Je vous demande de régulariser cette situation dans un délai de 48 heures.

À défaut de règlement, je me verrai dans l'obligation de vous adresser une mise en demeure officielle.

${d.votreNom || '[Votre nom]'}`,

  4: (d) =>
    `Madame, Monsieur,

MISE EN DEMEURE

À ce jour, votre dette de ${d.montant || '[MONTANT]'}€ TTC relative à la facture n°${d.numFacture || '[NUMÉRO]'} demeure impayée malgré mes relances répétées.

Sauf règlement intégral sous 8 jours à compter de la réception du présent message, je serai contraint(e) de vous adresser une mise en demeure par lettre recommandée avec accusé de réception, préalable à une procédure d'injonction de payer.

Les frais de recouvrement engendrés resteront à votre charge.

Distinguées salutations,
${d.votreNom || '[Votre nom]'}`,
};

export default function GenerateurRelancePage() {
  const [form, setForm] = useState({
    votreNom: '',
    clientPrenom: '',
    numFacture: '',
    montant: '',
    dateFacture: '',
    dateEcheance: '',
    niveau: '1',
  });
  const [result, setResult] = useState('');
  const [copied, setCopied] = useState(false);
  const [generated, setGenerated] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const generate = () => {
    const niv = parseInt(form.niveau) as 1 | 2 | 3 | 4;
    const template = TEMPLATES[niv] || TEMPLATES[1];
    setResult(template(form));
    setGenerated(true);
  };

  const copy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const levelLabels: Record<string, { label: string; color: string; desc: string }> = {
    '1': { label: 'Amicale (J+3)', color: '#6366f1', desc: 'Ton chaleureux, simple rappel' },
    '2': { label: 'Formelle (J+10)', color: '#f59e0b', desc: 'Ton professionnel, demande de confirmation' },
    '3': { label: 'Ferme (J+20)', color: '#ef4444', desc: 'Ton ferme, mention des pénalités légales' },
    '4': { label: 'Mise en demeure (J+30)', color: '#ef4444', desc: 'Ultimatum avant action judiciaire' },
  };

  return (
    <div style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}>
      <Navbar />

      <div style={{ paddingTop: 120, paddingBottom: 80 }}>
        <div className="container" style={{ maxWidth: 900 }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <div className="badge badge-warning" style={{ marginBottom: 16, display: 'inline-flex' }}>
              ✨ Outil 100% gratuit
            </div>
            <h1
              style={{
                fontSize: 'clamp(28px, 4vw, 52px)',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                marginBottom: 16,
              }}
            >
              Générateur de{' '}
              <span className="gradient-text">lettre de relance</span> gratuit
            </h1>
            <p
              style={{
                fontSize: 17,
                color: 'var(--text-secondary)',
                maxWidth: 540,
                margin: '0 auto',
              }}
            >
              Créez votre email de relance personnalisé en 30 secondes. 4 niveaux d&apos;urgence.
              Aucune inscription requise.
            </p>
          </div>

          {/* Level selector */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 12,
              marginBottom: 32,
            }}
          >
            {Object.entries(levelLabels).map(([key, val]) => (
              <button
                key={key}
                onClick={() => setForm({ ...form, niveau: key })}
                style={{
                  padding: '12px 16px',
                  borderRadius: 12,
                  border: `1px solid ${form.niveau === key ? val.color : 'var(--border)'}`,
                  background:
                    form.niveau === key
                      ? `rgba(${key === '1' ? '99,102,241' : key === '2' ? '245,158,11' : '239,68,68'},0.1)`
                      : 'var(--bg-card)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s',
                }}
              >
                <div style={{ fontSize: 12, fontWeight: 700, color: val.color, marginBottom: 4 }}>
                  Niveau {key}
                </div>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 2 }}>
                  {val.label}
                </div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{val.desc}</div>
              </button>
            ))}
          </div>

          {/* Main grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            {/* Form */}
            <div className="card">
              <h2 style={{ fontSize: 17, fontWeight: 700, marginBottom: 24 }}>
                Vos informations
              </h2>
              <div style={{ display: 'grid', gap: 16 }}>
                <div>
                  <label className="label" htmlFor="gen-votreNom">Votre nom complet</label>
                  <input
                    id="gen-votreNom"
                    name="votreNom"
                    className="input"
                    placeholder="Marie Dupont"
                    value={form.votreNom}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="label" htmlFor="gen-clientPrenom">Prénom du client</label>
                  <input
                    id="gen-clientPrenom"
                    name="clientPrenom"
                    className="input"
                    placeholder="Jean"
                    value={form.clientPrenom}
                    onChange={handleChange}
                  />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div>
                    <label className="label" htmlFor="gen-numFacture">N° de facture</label>
                    <input
                      id="gen-numFacture"
                      name="numFacture"
                      className="input"
                      placeholder="2026-042"
                      value={form.numFacture}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="label" htmlFor="gen-montant">Montant (€)</label>
                    <input
                      id="gen-montant"
                      name="montant"
                      type="number"
                      className="input"
                      placeholder="1200"
                      value={form.montant}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div>
                    <label className="label" htmlFor="gen-dateFacture">Date facture</label>
                    <input
                      id="gen-dateFacture"
                      name="dateFacture"
                      type="date"
                      className="input"
                      value={form.dateFacture}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="label" htmlFor="gen-dateEcheance">Date échéance</label>
                    <input
                      id="gen-dateEcheance"
                      name="dateEcheance"
                      type="date"
                      className="input"
                      value={form.dateEcheance}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <button
                  className="btn btn-primary"
                  onClick={generate}
                  id="btn-generate-relance"
                  style={{ marginTop: 4 }}
                >
                  ✨ Générer ma lettre de relance
                </button>
              </div>
            </div>

            {/* Result */}
            <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 16,
                }}
              >
                <h2 style={{ fontSize: 17, fontWeight: 700 }}>Votre lettre générée</h2>
                {result && (
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={copy}
                    id="btn-copy-relance"
                  >
                    {copied ? '✓ Copié !' : '📋 Copier'}
                  </button>
                )}
              </div>

              {result ? (
                <>
                  <textarea
                    readOnly
                    value={result}
                    style={{
                      flex: 1,
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid var(--border)',
                      borderRadius: 10,
                      padding: 16,
                      color: 'var(--text-secondary)',
                      fontSize: 14,
                      lineHeight: 1.7,
                      resize: 'none',
                      fontFamily: 'Inter, sans-serif',
                      minHeight: 280,
                      outline: 'none',
                    }}
                  />
                  <div
                    style={{
                      marginTop: 16,
                      background: 'rgba(99,102,241,0.08)',
                      border: '1px solid rgba(99,102,241,0.2)',
                      borderRadius: 10,
                      padding: '14px 16px',
                      fontSize: 13,
                      color: '#818cf8',
                    }}
                  >
                    💡 <strong>Pour automatiser l&apos;envoi :</strong> avec{' '}
                    <Link href="/signup" style={{ color: '#6366f1', fontWeight: 700 }}>
                      RelancePro (14j gratuits)
                    </Link>
                    , ces emails partent automatiquement à J+3, J+10, J+20 et J+30.
                  </div>
                </>
              ) : (
                <div
                  style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--text-muted)',
                    fontSize: 14,
                    textAlign: 'center',
                    border: '1px dashed var(--border)',
                    borderRadius: 10,
                    padding: 32,
                    minHeight: 280,
                  }}
                >
                  <div>
                    <div style={{ fontSize: 48, marginBottom: 16 }}>✍️</div>
                    <div>
                      Remplissez le formulaire et cliquez sur
                      <br />
                      &quot;Générer ma lettre de relance&quot;
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Info section */}
          <div
            style={{
              marginTop: 48,
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: 16,
            }}
          >
            {[
              { icon: '⚡', title: '30 secondes', desc: 'C\'est le temps moyen pour générer une lettre complète' },
              { icon: '⚖️', title: 'Conforme au droit français', desc: 'Mentions légales (L441-6 du Code de commerce) incluses' },
              { icon: '🔄', title: '4 niveaux d\'urgence', desc: 'De la relance amicale à la mise en demeure' },
              { icon: '🚀', title: 'Automatisez avec RelancePro', desc: 'Envoi automatique, suivi, et PDF mis en demeure' },
            ].map((item) => (
              <div key={item.title} className="glass" style={{ padding: 20 }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{item.icon}</div>
                <div style={{ fontWeight: 700, marginBottom: 4, fontSize: 15 }}>{item.title}</div>
                <div style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.5 }}>{item.desc}</div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          {generated && (
            <div
              style={{
                marginTop: 48,
                background: 'linear-gradient(135deg, rgba(99,102,241,0.12), rgba(139,92,246,0.08))',
                border: '1px solid rgba(99,102,241,0.25)',
                borderRadius: 20,
                padding: 40,
                textAlign: 'center',
              }}
            >
              <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 8 }}>
                ⚡ Fini de copier-coller manuellement
              </h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: 24, fontSize: 15 }}>
                RelancePro envoie ces emails automatiquement à vos clients — sans que vous ayez
                à lever le petit doigt. 14 jours gratuits, sans carte bancaire.
              </p>
              <Link href="/signup" className="btn btn-primary btn-lg" id="cta-tool-bottom">
                Automatiser mes relances →
              </Link>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
