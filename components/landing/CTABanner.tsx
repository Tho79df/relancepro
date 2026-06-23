import Link from 'next/link';

export default function CTABanner() {
  return (
    <section className="section" style={{ paddingTop: 40, paddingBottom: 100 }}>
      <div className="container">
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(139,92,246,0.15))',
            border: '1px solid rgba(99,102,241,0.3)',
            borderRadius: 24,
            padding: 'clamp(40px, 6vw, 80px)',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Background orbs */}
          <div style={{ position: 'absolute', width: 300, height: 300, background: 'rgba(99,102,241,0.1)', borderRadius: '50%', filter: 'blur(60px)', top: -100, right: -50, pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', width: 200, height: 200, background: 'rgba(139,92,246,0.1)', borderRadius: '50%', filter: 'blur(60px)', bottom: -50, left: -50, pointerEvents: 'none' }} />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>💰</div>
            <h2
              style={{
                fontSize: 'clamp(28px, 5vw, 52px)',
                fontWeight: 900,
                letterSpacing: '-0.04em',
                marginBottom: 16,
                lineHeight: 1.1,
              }}
            >
              Combien d&apos;argent avez-vous laissé<br />
              <span className="gradient-text">sur la table ce mois-ci ?</span>
            </h2>
            <p style={{ fontSize: 18, color: 'var(--text-secondary)', marginBottom: 36, maxWidth: 500, margin: '0 auto 36px' }}>
              Chaque jour sans RelancePro est un jour où vos clients peuvent se permettre de ne pas vous payer.
            </p>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/signup" className="btn btn-primary btn-lg" id="cta-bottom-signup">
                🚀 Commencer maintenant — Gratuit 14 jours
              </Link>
            </div>
            <p style={{ marginTop: 16, fontSize: 13, color: 'var(--text-muted)' }}>
              Plus de 500 freelances nous font déjà confiance · Résiliable à tout moment
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
