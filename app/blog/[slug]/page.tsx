import { notFound } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import { blogPosts, getPostBySlug } from '@/lib/blog-posts';
import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/metadata';
import { JsonLd } from '@/components/JsonLd';

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const ogImage = `${SITE_URL}/api/og?title=${encodeURIComponent(post.title)}&category=${encodeURIComponent(post.category)}`;

  return {
    // NB: le template '%s | RelancePro' est appliqué automatiquement — pas de doublon
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: `${SITE_URL}/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      url: `${SITE_URL}/blog/${post.slug}`,
      publishedTime: new Date().toISOString(),
      images: [{ url: ogImage, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [ogImage],
    },
  };
}

function renderContent(content: string): string {
  return content
    .replace(
      /^## (.+)$/gm,
      '<h2 style="font-size:26px;font-weight:800;color:var(--text-primary);margin:48px 0 16px;letter-spacing:-0.02em;line-height:1.2">$1</h2>'
    )
    .replace(
      /^### (.+)$/gm,
      '<h3 style="font-size:18px;font-weight:700;color:var(--text-primary);margin:32px 0 12px">$1</h3>'
    )
    .replace(
      /\*\*(.+?)\*\*/g,
      '<strong style="color:var(--text-primary);font-weight:700">$1</strong>'
    )
    .replace(/\*(.+?)\*/g, '<em style="font-style:italic">$1</em>')
    .replace(
      /`(.+?)`/g,
      '<code style="background:rgba(99,102,241,0.15);color:#818cf8;padding:2px 8px;border-radius:4px;font-size:14px;font-family:monospace">$1</code>'
    )
    .replace(
      /^> (.+)$/gm,
      '<blockquote style="border-left:3px solid #6366f1;padding:16px 20px;margin:24px 0;background:rgba(99,102,241,0.06);border-radius:0 10px 10px 0;font-style:italic;color:var(--text-secondary)">$1</blockquote>'
    )
    .replace(/^- (.+)$/gm, '<li style="margin-bottom:8px;padding-left:4px">$1</li>')
    .replace(/(<li.*<\/li>\n?)+/g, '<ul style="margin:16px 0 16px 20px;color:var(--text-secondary)">$&</ul>')
    .replace(/^\d+\. (.+)$/gm, '<li style="margin-bottom:8px">$1</li>')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" style="color:#818cf8;text-decoration:none;font-weight:600;border-bottom:1px solid rgba(129,140,248,0.3)">$1</a>')
    .replace(/^---$/gm, '<hr style="border:none;border-top:1px solid var(--border);margin:36px 0">')
    .replace(/\n\n/g, '</p><p style="margin-bottom:18px;color:var(--text-secondary);line-height:1.8">')
    .replace(/^/, '<p style="margin-bottom:18px;color:var(--text-secondary);line-height:1.8">')
    .replace(/$/, '</p>');
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const relatedPosts = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <div style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}>
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'Article',
        '@id': `${SITE_URL}/blog/${slug}#article`,
        headline: post.title,
        description: post.description,
        image: {
          '@type': 'ImageObject',
          url: `${SITE_URL}/api/og?title=${encodeURIComponent(post.title)}&category=${encodeURIComponent(post.category)}`,
          width: 1200,
          height: 630,
        },
        datePublished: new Date().toISOString(),
        dateModified: new Date().toISOString(),
        author: { '@type': 'Organization', name: 'RelancePro', url: SITE_URL },
        publisher: {
          '@type': 'Organization',
          '@id': `${SITE_URL}/#organization`,
          name: 'RelancePro',
          logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png` },
        },
        mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/blog/${slug}` },
        articleSection: post.category,
        keywords: post.keywords.join(', '),
        inLanguage: 'fr-FR',
        isPartOf: { '@id': `${SITE_URL}/#website` },
      }} />
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
          { '@type': 'ListItem', position: 3, name: post.category, item: `${SITE_URL}/blog` },
          { '@type': 'ListItem', position: 4, name: post.title, item: `${SITE_URL}/blog/${slug}` },
        ],
      }} />
      <Navbar />


      <div style={{ paddingTop: 120, paddingBottom: 80 }}>
        <div style={{ maxWidth: 780, margin: '0 auto', padding: '0 24px' }}>
          {/* Breadcrumb */}
          <div
            style={{
              display: 'flex',
              gap: 8,
              alignItems: 'center',
              marginBottom: 40,
              fontSize: 13,
              color: 'var(--text-muted)',
            }}
          >
            <Link href="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>
              Accueil
            </Link>
            <span>›</span>
            <Link href="/blog" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>
              Blog
            </Link>
            <span>›</span>
            <span style={{ color: 'var(--text-secondary)' }}>{post.category}</span>
          </div>

          {/* Hero */}
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <div style={{ fontSize: 72, marginBottom: 20 }}>{post.emoji}</div>
            <span
              className="badge badge-info"
              style={{ marginBottom: 20, display: 'inline-flex' }}
            >
              {post.category}
            </span>
            <h1
              style={{
                fontSize: 'clamp(26px, 4vw, 42px)',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                marginBottom: 20,
                lineHeight: 1.2,
                color: 'var(--text-primary)',
              }}
            >
              {post.title}
            </h1>
            <p
              style={{
                fontSize: 17,
                color: 'var(--text-secondary)',
                lineHeight: 1.7,
                marginBottom: 20,
                maxWidth: 600,
                margin: '0 auto 20px',
              }}
            >
              {post.description}
            </p>
            <div
              style={{
                display: 'flex',
                gap: 20,
                justifyContent: 'center',
                fontSize: 13,
                color: 'var(--text-muted)',
              }}
            >
              <span>📅 {post.date}</span>
              <span>·</span>
              <span>⏱ {post.readTime} de lecture</span>
            </div>
          </div>

          {/* In-article CTA */}
          <div
            style={{
              background: 'rgba(99,102,241,0.08)',
              border: '1px solid rgba(99,102,241,0.2)',
              borderRadius: 14,
              padding: '20px 24px',
              marginBottom: 48,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 16,
            }}
          >
            <div>
              <div style={{ fontWeight: 700, marginBottom: 4, fontSize: 15 }}>
                ⚡ Automatisez tout ça avec RelancePro
              </div>
              <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                Relances auto · Mise en demeure PDF · Dès 9€/mois
              </div>
            </div>
            <Link
              href="/signup"
              className="btn btn-primary btn-sm"
              id="cta-article-signup"
            >
              Essai gratuit 14j →
            </Link>
          </div>

          {/* Article content */}
          <article
            style={{ fontSize: 16, lineHeight: 1.8 }}
            dangerouslySetInnerHTML={{ __html: renderContent(post.content) }}
          />

          {/* Bottom CTA */}
          <div
            style={{
              marginTop: 64,
              background: 'linear-gradient(135deg, rgba(99,102,241,0.12), rgba(139,92,246,0.08))',
              border: '1px solid rgba(99,102,241,0.25)',
              borderRadius: 20,
              padding: 40,
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: 36, marginBottom: 12 }}>⚡</div>
            <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 8 }}>
              Prêt à automatiser vos relances ?
            </h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 24, fontSize: 15 }}>
              14 jours gratuits · Sans carte bancaire · Setup en 5 minutes
            </p>
            <Link href="/signup" className="btn btn-primary btn-lg" id="cta-article-bottom">
              Démarrer gratuitement →
            </Link>
          </div>

          {/* Related posts */}
          {relatedPosts.length > 0 && (
            <div style={{ marginTop: 64 }}>
              <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 24 }}>
                Articles similaires
              </h3>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                  gap: 16,
                }}
              >
                {relatedPosts.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/blog/${p.slug}`}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    <div className="glass glass-hover" style={{ padding: 20 }}>
                      <div style={{ fontSize: 32, marginBottom: 10 }}>{p.emoji}</div>
                      <div
                        style={{
                          fontSize: 12,
                          color: '#818cf8',
                          fontWeight: 700,
                          marginBottom: 6,
                          textTransform: 'uppercase',
                          letterSpacing: '0.06em',
                        }}
                      >
                        {p.category}
                      </div>
                      <div style={{ fontSize: 14, fontWeight: 700, lineHeight: 1.4 }}>
                        {p.title}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Schema.org Article */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'Article',
                headline: post.title,
                description: post.description,
                datePublished: post.date,
                author: { '@type': 'Organization', name: 'RelancePro' },
                publisher: {
                  '@type': 'Organization',
                  name: 'RelancePro',
                  url: 'https://relancepro.fr',
                },
                keywords: post.keywords.join(', '),
              }),
            }}
          />
        </div>
      </div>

      <Footer />
    </div>
  );
}
