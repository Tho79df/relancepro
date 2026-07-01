import Link from 'next/link';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import { blogPosts } from '@/lib/blog-posts';
import type { Metadata } from 'next';

import { SITE_URL } from '@/lib/metadata';

export const metadata: Metadata = {
  title: 'Blog — Conseils pour gérer vos factures impayées',
  description:
    'Articles, guides et modèles pour aider les freelances et auto-entrepreneurs à gérer leurs impayés et relancer leurs clients efficacement.',
  keywords: ['relance facture impayée', 'modèle relance', 'délai légal paiement', 'auto-entrepreneur impayé'],
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/blog`,
    title: 'Blog RelancePro — Conseils pour gérer vos factures impayées',
    description: 'Articles, guides et modèles pour aider les freelances à gérer leurs impayés.',
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog RelancePro — Conseils pour gérer vos factures impayées',
    description: 'Articles, guides et modèles pour aider les freelances à gérer leurs impayés.',
  },
};

export default function BlogPage() {
  const categories = [...new Set(blogPosts.map((p) => p.category))];

  return (
    <div style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}>
      <Navbar />

      <div style={{ paddingTop: 120, paddingBottom: 80 }}>
        <div className="container">
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <div className="badge badge-info" style={{ marginBottom: 16, display: 'inline-flex' }}>
              Blog
            </div>
            <h1
              style={{
                fontSize: 'clamp(28px, 4vw, 52px)',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                marginBottom: 16,
              }}
            >
              Ressources pour{' '}
              <span className="gradient-text">arrêter de subir</span> les impayés
            </h1>
            <p
              style={{
                fontSize: 18,
                color: 'var(--text-secondary)',
                maxWidth: 480,
                margin: '0 auto',
              }}
            >
              Guides pratiques, modèles et conseils pour les freelances français.
            </p>
          </div>

          {/* Category filter */}
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 48, flexWrap: 'wrap' }}>
            <span
              style={{
                padding: '6px 16px',
                borderRadius: 100,
                background: 'rgba(99,102,241,0.15)',
                color: '#818cf8',
                fontSize: 13,
                fontWeight: 600,
              }}
            >
              Tous les articles
            </span>
            {categories.map((cat) => (
              <span
                key={cat}
                style={{
                  padding: '6px 16px',
                  borderRadius: 100,
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  color: 'var(--text-muted)',
                  fontSize: 13,
                  fontWeight: 500,
                  cursor: 'pointer',
                }}
              >
                {cat}
              </span>
            ))}
          </div>

          {/* Featured article */}
          <Link
            href={`/blog/${blogPosts[0].slug}`}
            style={{ textDecoration: 'none', color: 'inherit', display: 'block', marginBottom: 40 }}
          >
            <div
              className="glass glass-hover"
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 0,
                overflow: 'hidden',
                borderRadius: 20,
              }}
            >
              <div
                style={{
                  background: 'linear-gradient(135deg, rgba(99,102,241,0.3), rgba(139,92,246,0.2))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: 260,
                  fontSize: 80,
                }}
              >
                {blogPosts[0].emoji}
              </div>
              <div style={{ padding: 40, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
                  <span className="badge badge-info">{blogPosts[0].category}</span>
                  <span className="badge badge-muted">⭐ Article phare</span>
                </div>
                <h2
                  style={{
                    fontSize: 24,
                    fontWeight: 800,
                    letterSpacing: '-0.02em',
                    marginBottom: 12,
                    lineHeight: 1.3,
                  }}
                >
                  {blogPosts[0].title}
                </h2>
                <p style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 20 }}>
                  {blogPosts[0].description}
                </p>
                <div style={{ display: 'flex', gap: 16, fontSize: 13, color: 'var(--text-muted)' }}>
                  <span>📅 {blogPosts[0].date}</span>
                  <span>·</span>
                  <span>⏱ {blogPosts[0].readTime} de lecture</span>
                </div>
              </div>
            </div>
          </Link>

          {/* Article grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: 24,
            }}
          >
            {blogPosts.slice(1).map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="blog-card"
              >
                <div className="blog-card-img">
                  <span style={{ fontSize: 56 }}>{post.emoji}</span>
                </div>
                <div className="blog-card-body">
                  <div className="blog-tag">
                    {post.category} · {post.readTime} de lecture
                  </div>
                  <h2
                    style={{
                      fontSize: 18,
                      fontWeight: 700,
                      marginBottom: 10,
                      lineHeight: 1.4,
                    }}
                  >
                    {post.title}
                  </h2>
                  <p
                    style={{
                      fontSize: 14,
                      color: 'var(--text-secondary)',
                      lineHeight: 1.6,
                      marginBottom: 16,
                    }}
                  >
                    {post.description}
                  </p>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{post.date}</div>
                </div>
              </Link>
            ))}
          </div>

          {/* SEO tool CTA */}
          <div
            style={{
              marginTop: 64,
              background: 'linear-gradient(135deg, rgba(245,158,11,0.1), rgba(239,68,68,0.08))',
              border: '1px solid rgba(245,158,11,0.3)',
              borderRadius: 20,
              padding: 40,
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: 40, marginBottom: 12 }}>✍️</div>
            <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 8 }}>
              Générateur de lettre de relance gratuit
            </h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 24, fontSize: 15 }}>
              Créez votre email de relance personnalisé en 30 secondes. Aucune inscription requise.
            </p>
            <Link href="/outils/generateur-relance" className="btn btn-primary" id="cta-blog-tool">
              Générer ma lettre gratuite →
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
