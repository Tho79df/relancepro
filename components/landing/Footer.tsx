import Link from 'next/link';

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--border)',
        padding: '60px 0 40px',
        background: 'var(--bg-secondary)',
      }}
    >
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 48, marginBottom: 48 }}>
          {/* Brand */}
          <div>
            <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ color: '#6366f1' }}>⚡</span> RelancePro
            </div>
            <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 16, maxWidth: 280 }}>
              Le logiciel de relance d&apos;impayés pour les freelances et auto-entrepreneurs français.
            </p>
            <div className="badge badge-success" style={{ display: 'inline-flex' }}>✓ Conforme RGPD</div>
          </div>

          {/* Product */}
          <div>
            <h4 style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 16 }}>Produit</h4>
            <ul style={{ listStyle: 'none' }}>
              {[
                { label: 'Fonctionnalités', href: '#features' },
                { label: 'Tarifs', href: '#tarifs' },
                { label: 'Comment ça marche', href: '#comment-ca-marche' },
                { label: 'Essai gratuit 14 jours', href: '/signup' },
              ].map(l => (
                <li key={l.label} style={{ marginBottom: 8 }}>
                  <a href={l.href} style={{ color: 'var(--text-secondary)', fontSize: 14, textDecoration: 'none' }}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Blog & Outils */}
          <div>
            <h4 style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 16 }}>Ressources SEO</h4>
            <ul style={{ listStyle: 'none' }}>
              {[
                { label: 'Blog', href: '/blog' },
                { label: 'Générateur de lettre de relance', href: '/outils/generateur-relance' },
                { label: 'Modèles email relance', href: '/blog/modeles-email-relance-facture' },
                { label: 'Mise en demeure gratuite', href: '/blog/mise-en-demeure-modele-gratuit' },
              ].map(l => (
                <li key={l.label} style={{ marginBottom: 8 }}>
                  <Link href={l.href} style={{ color: 'var(--text-secondary)', fontSize: 14, textDecoration: 'none' }}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 16 }}>Légal</h4>
            <ul style={{ listStyle: 'none' }}>
              {[
                { label: 'Mentions légales', href: '/mentions-legales' },
                { label: 'Politique de confidentialité', href: '/confidentialite' },
                { label: 'CGV', href: '/cgv' },
                { label: 'Contact', href: 'mailto:hello@relancepro.fr' },
              ].map(l => (
                <li key={l.label} style={{ marginBottom: 8 }}>
                  <a href={l.href} style={{ color: 'var(--text-secondary)', fontSize: 14, textDecoration: 'none' }}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="divider" />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>
            © 2026 RelancePro. Fait avec ❤️ en France.
          </p>
          <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>
            Hébergé en Europe · Conforme RGPD
          </p>
        </div>
      </div>
    </footer>
  );
}
