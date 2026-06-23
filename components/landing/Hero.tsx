import Link from 'next/link';

export default function Hero() {
  return (
    <section
      id="hero"
      style={{
        paddingTop: 160,
        paddingBottom: 100,
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'center',
      }}
    >
      {/* Background orbs */}
      <div
        className="hero-orb"
        style={{
          width: 600,
          height: 400,
          background: 'rgba(99,102,241,0.15)',
          top: -100,
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      />
      <div
        className="hero-orb"
        style={{
          width: 300,
          height: 300,
          background: 'rgba(139,92,246,0.1)',
          bottom: 0,
          right: '10%',
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Badge */}
        <div
          className="badge badge-info animate-fade-up"
          style={{ marginBottom: 24, display: 'inline-flex' }}
        >
          ⚡ 4,3 millions d&apos;auto-entrepreneurs en France — et 12 Mds€ d&apos;impayés chaque année
        </div>

        {/* Headline */}
        <h1
          className="animate-fade-up animate-fade-up-delay-1"
          style={{
            fontSize: 'clamp(40px, 6vw, 72px)',
            fontWeight: 900,
            lineHeight: 1.05,
            letterSpacing: '-0.04em',
            marginBottom: 24,
          }}
        >
          Fini les factures impayées.<br />
          <span className="gradient-text">Relancez automatiquement,</span><br />
          sans stress.
        </h1>

        {/* Subheadline */}
        <p
          className="animate-fade-up animate-fade-up-delay-2"
          style={{
            fontSize: 20,
            color: 'var(--text-secondary)',
            maxWidth: 600,
            margin: '0 auto 40px',
            lineHeight: 1.6,
          }}
        >
          RelancePro envoie des relances email progressives et professionnelles
          à vos clients en retard — pendant que vous dormez.
          Récupérez votre argent. Préservez vos relations.
        </p>

        {/* CTAs */}
        <div
          className="animate-fade-up animate-fade-up-delay-3"
          style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <Link href="/signup" className="btn btn-primary btn-lg" id="cta-hero-signup">
            🚀 Démarrer gratuitement — 14 jours
          </Link>
          <a href="#comment-ca-marche" className="btn btn-secondary btn-lg" id="cta-hero-demo">
            Voir comment ça marche
          </a>
        </div>

        {/* Trust signals */}
        <p
          style={{
            marginTop: 24,
            fontSize: 13,
            color: 'var(--text-muted)',
          }}
        >
          ✓ Sans carte bancaire &nbsp;•&nbsp; ✓ Setup en 5 minutes &nbsp;•&nbsp; ✓ Résiliable à tout moment
        </p>

        {/* Dashboard preview mockup */}
        <div
          style={{
            marginTop: 72,
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: 20,
            padding: 24,
            maxWidth: 900,
            margin: '72px auto 0',
            boxShadow: '0 40px 80px rgba(0,0,0,0.5), 0 0 80px rgba(99,102,241,0.1)',
          }}
        >
          {/* Fake browser chrome */}
          <div style={{ display: 'flex', gap: 6, marginBottom: 20 }}>
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ef4444' }} />
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#f59e0b' }} />
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#10b981' }} />
            <div
              style={{
                flex: 1,
                height: 24,
                background: 'rgba(255,255,255,0.05)',
                borderRadius: 6,
                marginLeft: 8,
                display: 'flex',
                alignItems: 'center',
                paddingLeft: 12,
                fontSize: 11,
                color: 'var(--text-muted)',
              }}
            >
              app.relancepro.fr/dashboard
            </div>
          </div>

          {/* Stats row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
            {[
              { label: 'Factures en retard', value: '7', color: '#ef4444' },
              { label: 'Montant en risque', value: '4 280€', color: '#f59e0b' },
              { label: 'Récupéré ce mois', value: '2 150€', color: '#10b981' },
              { label: 'Relances envoyées', value: '23', color: '#6366f1' },
            ].map((stat) => (
              <div
                key={stat.label}
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid var(--border)',
                  borderRadius: 12,
                  padding: 16,
                  textAlign: 'left',
                }}
              >
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  {stat.label}
                </div>
                <div style={{ fontSize: 28, fontWeight: 800, color: stat.color, letterSpacing: '-0.03em' }}>
                  {stat.value}
                </div>
              </div>
            ))}
          </div>

          {/* Fake table */}
          <div style={{ background: 'rgba(255,255,255,0.02)', borderRadius: 10, padding: '0 4px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  {['Client', 'Montant', 'Retard', 'Dernière relance', 'Statut'].map(h => (
                    <th key={h} style={{ textAlign: 'left', padding: '10px 12px', fontSize: 11, color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', borderBottom: '1px solid var(--border)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { client: 'Studio Dupont', amount: '1 200€', delay: '18 jours', last: 'il y a 3j', status: 'badge-warning', statusText: 'Relance 2' },
                  { client: 'Agence Créa', amount: '840€', delay: '32 jours', last: 'Demain', status: 'badge-danger', statusText: 'Relance 3' },
                  { client: 'Marie Lefebvre', amount: '650€', delay: '5 jours', last: 'Aujourd\'hui', status: 'badge-info', statusText: 'Relance 1' },
                ].map(row => (
                  <tr key={row.client} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <td style={{ padding: '12px', fontSize: 13, fontWeight: 600 }}>{row.client}</td>
                    <td style={{ padding: '12px', fontSize: 13, color: '#f8fafc' }}>{row.amount}</td>
                    <td style={{ padding: '12px', fontSize: 13, color: '#ef4444' }}>{row.delay}</td>
                    <td style={{ padding: '12px', fontSize: 13, color: 'var(--text-secondary)' }}>{row.last}</td>
                    <td style={{ padding: '12px' }}>
                      <span className={`badge ${row.status}`}>{row.statusText}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
