import Link from 'next/link';

export default function Pricing() {
  const plans = [
    {
      name: 'Starter',
      price: 9,
      description: 'Idéal pour les freelances qui débutent',
      features: [
        '5 factures actives simultanément',
        '3 niveaux de relance automatique',
        'Templates email professionnels',
        'Tableau de bord basique',
        'Support par email',
      ],
      cta: 'Démarrer gratuitement',
      href: '/signup?plan=starter',
      popular: false,
    },
    {
      name: 'Pro',
      price: 19,
      description: 'Pour les freelances sérieux',
      features: [
        'Factures illimitées',
        '5 niveaux de relance automatique',
        'Mise en demeure PDF en 1 clic',
        'Tableau de bord "Argent sauvé"',
        'Personnalisation des emails',
        'Import CSV de factures',
        'Support prioritaire',
      ],
      cta: 'Démarrer gratuitement',
      href: '/signup?plan=pro',
      popular: true,
    },
    {
      name: 'Studio',
      price: 39,
      description: 'Pour les agences et EA multi-clients',
      features: [
        'Tout le plan Pro',
        'Gestion multi-clients (agences)',
        'Rapports mensuels PDF',
        'API d\'accès (bientôt)',
        'Compte manager dédié',
        'Onboarding personnalisé',
      ],
      cta: 'Contacter l\'équipe',
      href: '/signup?plan=studio',
      popular: false,
    },
  ];

  return (
    <section id="tarifs" className="section">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <div className="badge badge-warning" style={{ marginBottom: 16, display: 'inline-flex' }}>Tarifs simples</div>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 16 }}>
            Un investissement <span className="gradient-text">ridiculement petit</span>{' '}
            face à l&apos;argent récupéré
          </h2>
          <p style={{ fontSize: 18, color: 'var(--text-secondary)', maxWidth: 520, margin: '0 auto' }}>
            Récupérer une seule facture de 500€ couvre <strong style={{ color: 'white' }}>4 ans d&apos;abonnement Pro</strong>.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, alignItems: 'start' }}>
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`pricing-card ${plan.popular ? 'popular' : ''}`}
            >
              {plan.popular && <div className="popular-badge">⭐ Le plus populaire</div>}

              <div style={{ marginBottom: 24 }}>
                <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>{plan.name}</h3>
                <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>{plan.description}</p>
              </div>

              <div style={{ marginBottom: 28 }}>
                <span style={{ fontSize: 52, fontWeight: 900, letterSpacing: '-0.04em' }}>{plan.price}€</span>
                <span style={{ color: 'var(--text-muted)', fontSize: 15 }}>/mois</span>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>Résiliable à tout moment</div>
              </div>

              <div className="divider" />

              <ul style={{ listStyle: 'none', marginBottom: 28 }}>
                {plan.features.map((f) => (
                  <li key={f} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 10, fontSize: 14 }}>
                    <span style={{ color: '#10b981', flexShrink: 0, marginTop: 1 }}>✓</span>
                    <span style={{ color: 'var(--text-secondary)' }}>{f}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={plan.href}
                className={`btn ${plan.popular ? 'btn-primary' : 'btn-secondary'}`}
                style={{ width: '100%' }}
                id={`cta-pricing-${plan.name.toLowerCase()}`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        {/* Money-back guarantee */}
        <div style={{ textAlign: 'center', marginTop: 48 }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 12,
              background: 'rgba(16,185,129,0.1)',
              border: '1px solid rgba(16,185,129,0.3)',
              borderRadius: 100,
              padding: '12px 24px',
              fontSize: 14,
              color: '#10b981',
            }}
          >
            🛡️ <strong>Garantie satisfait ou remboursé 30 jours</strong> — Aucun risque.
          </div>
        </div>
      </div>
    </section>
  );
}
