export default function Features() {
  const features = [
    {
      icon: '🤖',
      title: 'Relances 100% automatiques',
      description:
        'Configurez une fois, oubliez. RelancePro envoie des emails de relance J+3, J+10, J+20, J+30 après l\'échéance — sans que vous ayez à lever le petit doigt.',
      color: 'rgba(99,102,241,0.15)',
      iconColor: '#818cf8',
    },
    {
      icon: '📈',
      title: 'Escalade progressive et intelligente',
      description:
        'Chaque relance est calibrée selon le niveau d\'urgence : amicale, formelle, ferme, puis mise en demeure officielle. Préservez la relation tout en récupérant votre argent.',
      color: 'rgba(16,185,129,0.15)',
      iconColor: '#10b981',
    },
    {
      icon: '📄',
      title: 'Mise en demeure PDF en 1 clic',
      description:
        'Générez automatiquement un document de mise en demeure légalement conforme, personnalisé avec les informations de votre facture. Téléchargeable et envoyable en 1 clic.',
      color: 'rgba(245,158,11,0.15)',
      iconColor: '#f59e0b',
    },
    {
      icon: '📊',
      title: 'Tableau de bord "Argent sauvé"',
      description:
        'Visualisez en temps réel les factures en retard, les montants en risque, et l\'argent récupéré grâce à RelancePro. Chaque euro retrouvé s\'affiche clairement.',
      color: 'rgba(239,68,68,0.15)',
      iconColor: '#ef4444',
    },
    {
      icon: '✍️',
      title: 'Templates email professionnels',
      description:
        '5 niveaux de relance pré-rédigés, adaptés au contexte français et au ton professionnel. Personnalisables à votre image. Jamais trop agressifs, jamais trop mous.',
      color: 'rgba(139,92,246,0.15)',
      iconColor: '#a78bfa',
    },
    {
      icon: '🔒',
      title: 'Données sécurisées en France',
      description:
        'Vos données et celles de vos clients sont hébergées en Europe, conformément au RGPD. Chiffrement bout en bout. Pas de partage avec des tiers.',
      color: 'rgba(20,184,166,0.15)',
      iconColor: '#2dd4bf',
    },
  ];

  return (
    <section id="features" className="section">
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <div className="badge badge-info" style={{ marginBottom: 16, display: 'inline-flex' }}>
            Fonctionnalités
          </div>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 16 }}>
            Tout ce dont vous avez besoin pour{' '}
            <span className="gradient-text">récupérer votre argent</span>
          </h2>
          <p style={{ fontSize: 18, color: 'var(--text-secondary)', maxWidth: 560, margin: '0 auto' }}>
            Un seul outil. Une seule mission : s&apos;assurer que vous êtes payé(e) — sans drama.
          </p>
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
          {features.map((f) => (
            <div key={f.title} className="glass glass-hover" style={{ padding: 28 }}>
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 14,
                  background: f.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 24,
                  marginBottom: 16,
                }}
              >
                {f.icon}
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>{f.title}</h3>
              <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
