export default function HowItWorks() {
  const steps = [
    {
      num: '01',
      title: 'Ajoutez votre facture',
      description: 'Saisissez les informations de votre facture : client, montant, date d\'échéance. En moins de 2 minutes.',
      icon: '📋',
    },
    {
      num: '02',
      title: 'Configurez la séquence',
      description: 'Choisissez vos délais de relance (J+3, J+10, J+20, J+30) et sélectionnez le ton : amical, formel ou ferme.',
      icon: '⚙️',
    },
    {
      num: '03',
      title: 'RelancePro fait le travail',
      description: 'Les emails partent automatiquement, personnalisés avec le nom du client et les détails de la facture.',
      icon: '🚀',
    },
    {
      num: '04',
      title: 'Vous êtes payé(e)',
      description: 'Marquez la facture comme payée. RelancePro calcule combien il vous a aidé à récupérer ce mois-ci.',
      icon: '💰',
    },
  ];

  return (
    <section id="comment-ca-marche" className="section" style={{ background: 'rgba(255,255,255,0.01)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <div className="badge badge-success" style={{ marginBottom: 16, display: 'inline-flex' }}>Comment ça marche</div>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 16 }}>
            Setup en <span className="gradient-text">5 minutes</span>. Résultats dès demain.
          </h2>
          <p style={{ fontSize: 18, color: 'var(--text-secondary)', maxWidth: 480, margin: '0 auto' }}>
            Pas de formation. Pas d&apos;intégration complexe. Vous êtes opérationnel en quelques clics.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 32, position: 'relative' }}>
          {steps.map((step, i) => (
            <div key={step.num} style={{ textAlign: 'center', position: 'relative' }}>
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div
                  style={{
                    position: 'absolute',
                    top: 32,
                    right: -16,
                    width: 32,
                    height: 2,
                    background: 'linear-gradient(90deg, var(--accent-primary), transparent)',
                    display: 'none', // hidden on mobile
                  }}
                />
              )}

              {/* Step number */}
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 16,
                  background: 'rgba(99,102,241,0.1)',
                  border: '1px solid rgba(99,102,241,0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 28,
                  margin: '0 auto 20px',
                }}
              >
                {step.icon}
              </div>

              <div
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  letterSpacing: '0.1em',
                  color: '#6366f1',
                  marginBottom: 8,
                  textTransform: 'uppercase',
                }}
              >
                Étape {step.num}
              </div>

              <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>{step.title}</h3>
              <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
