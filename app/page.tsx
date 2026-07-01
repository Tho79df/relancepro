import Navbar from '@/components/landing/Navbar';
import Hero from '@/components/landing/Hero';
import Features from '@/components/landing/Features';
import HowItWorks from '@/components/landing/HowItWorks';
import Pricing from '@/components/landing/Pricing';
import Testimonials from '@/components/landing/Testimonials';
import FAQ from '@/components/landing/FAQ';
import CTABanner from '@/components/landing/CTABanner';
import Footer from '@/components/landing/Footer';
import { JsonLd } from '@/components/JsonLd';
import { SITE_URL } from '@/lib/metadata';
import Link from 'next/link';
import { blogPosts } from '@/lib/blog-posts';

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  '@id': `${SITE_URL}/#app`,
  name: 'RelancePro',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  description:
    'Logiciel de relance automatique de factures impayées pour freelances et auto-entrepreneurs français.',
  url: SITE_URL,
  provider: { '@id': `${SITE_URL}/#organization` },
  offers: [
    {
      '@type': 'Offer',
      name: 'Starter',
      price: '9',
      priceCurrency: 'EUR',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: 9,
        priceCurrency: 'EUR',
        billingDuration: 'P1M',
      },
      description: '5 factures actives, 3 niveaux de relance, templates email professionnels',
      url: `${SITE_URL}/tarifs`,
    },
    {
      '@type': 'Offer',
      name: 'Pro',
      price: '19',
      priceCurrency: 'EUR',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: 19,
        priceCurrency: 'EUR',
        billingDuration: 'P1M',
      },
      description: 'Factures illimitées, 5 niveaux de relance, mise en demeure PDF, personnalisation',
      url: `${SITE_URL}/tarifs`,
    },
    {
      '@type': 'Offer',
      name: 'Studio',
      price: '39',
      priceCurrency: 'EUR',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: 39,
        priceCurrency: 'EUR',
        billingDuration: 'P1M',
      },
      description: 'Tout Pro + gestion multi-clients, rapports PDF, compte manager dédié',
      url: `${SITE_URL}/tarifs`,
    },
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    ratingCount: '127',
    bestRating: '5',
    worstRating: '1',
  },
  featureList: [
    'Relances automatiques par email',
    'Escalade progressive J+3 J+10 J+20 J+30',
    'Mise en demeure PDF en 1 clic',
    'Tableau de bord Argent récupéré',
    'Templates email professionnels',
    'Import CSV de factures',
    'Conforme RGPD',
    'Hébergé en Europe',
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Combien de temps faut-il pour commencer avec RelancePro ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Environ 5 minutes. Vous créez votre compte, ajoutez votre première facture, configurez la séquence de relances, et c'est parti. Pas de formation, pas d'intégration complexe.",
      },
    },
    {
      '@type': 'Question',
      name: "Est-ce que les emails de relance automatique vont froisser mes clients ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Non. RelancePro envoie des emails professionnels et progressifs, calibrés pour préserver la relation commerciale tout en récupérant votre argent. Le ton passe d'amical (J+3) à ferme (J+30) graduellement.",
      },
    },
    {
      '@type': 'Question',
      name: "Mes clients verront-ils que j'utilise un logiciel de relance ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Non. Les emails sont envoyés depuis votre propre adresse email et personnalisés avec votre nom. Vos clients recevront vos relances comme si vous les aviez écrites vous-même.",
      },
    },
    {
      '@type': 'Question',
      name: 'La mise en demeure PDF est-elle légalement valable en France ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Oui. Les mises en demeure générées par RelancePro respectent les mentions obligatoires du droit français (article L441-6 du Code de commerce) et sont acceptées comme document légal en cas de procédure judiciaire.",
      },
    },
    {
      '@type': 'Question',
      name: 'Puis-je essayer RelancePro gratuitement ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Oui. RelancePro propose un essai gratuit de 14 jours sans carte bancaire requise, résiliable à tout moment.',
      },
    },
    {
      '@type': 'Question',
      name: 'Mes données et celles de mes clients sont-elles sécurisées ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Oui. Toutes les données sont hébergées en Europe, conformément au RGPD. Le chiffrement est activé de bout en bout et aucune donnée n'est partagée avec des tiers.",
      },
    },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: "Comment automatiser vos relances de factures impayées avec RelancePro",
  description: 'Setup en 5 minutes pour ne plus jamais relancer manuellement un client.',
  totalTime: 'PT5M',
  tool: { '@type': 'HowToTool', name: 'RelancePro' },
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Ajoutez votre facture',
      text: "Saisissez les informations de votre facture : client, montant, date d'échéance. En moins de 2 minutes.",
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Configurez la séquence de relance',
      text: "Choisissez vos délais de relance (J+3, J+10, J+20, J+30) et sélectionnez le ton : amical, formel ou ferme.",
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'RelancePro automatise tout',
      text: "Les emails partent automatiquement, personnalisés avec le nom du client et les détails de la facture.",
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Vous êtes payé(e)',
      text: "Marquez la facture comme payée. RelancePro calcule combien il vous a aidé à récupérer ce mois-ci.",
    },
  ],
};

const reviewSchema = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'RelancePro',
  review: [
    {
      '@type': 'Review',
      reviewRating: { '@type': 'Rating', ratingValue: 5, bestRating: 5 },
      author: { '@type': 'Person', name: 'Sophie M.' },
      reviewBody: "J'avais une facture de 1 800€ qui traînait depuis 45 jours. Après 2 relances automatiques via RelancePro, le client a payé en 72h.",
      datePublished: '2026-01-15',
    },
    {
      '@type': 'Review',
      reviewRating: { '@type': 'Rating', ratingValue: 5, bestRating: 5 },
      author: { '@type': 'Person', name: 'Thomas D.' },
      reviewBody: "En tant que dev freelance, j'avais honte de parler d'argent avec mes clients. RelancePro le fait à ma place. 3 factures récupérées dès le premier mois.",
      datePublished: '2026-02-03',
    },
    {
      '@type': 'Review',
      reviewRating: { '@type': 'Rating', ratingValue: 5, bestRating: 5 },
      author: { '@type': 'Person', name: 'Amina K.' },
      reviewBody: "70% de retards de paiement en moins en 2 mois. Simple, efficace, pas besoin de formation.",
      datePublished: '2026-02-18',
    },
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: 4.9,
    reviewCount: 127,
    bestRating: 5,
  },
};

// Show top 3 blog articles on homepage for internal linking
const featuredPosts = blogPosts.slice(0, 3);

export default function LandingPage() {
  return (
    <main className="mesh-bg" style={{ minHeight: '100vh' }}>
      <JsonLd data={softwareSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={howToSchema} />
      <JsonLd data={reviewSchema} />
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <Pricing />
      <Testimonials />
      <FAQ />

      {/* Section ressources — Maillage interne vers le blog */}
      <section
        id="ressources"
        aria-labelledby="ressources-title"
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '80px 24px',
        }}
      >
        <h2
          id="ressources-title"
          style={{
            fontSize: 'clamp(24px, 3vw, 36px)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            textAlign: 'center',
            marginBottom: 12,
            color: 'var(--text-primary)',
          }}
        >
          Ressources pour arrêter de subir les impayés
        </h2>
        <p
          style={{
            textAlign: 'center',
            color: 'var(--text-secondary)',
            fontSize: 16,
            marginBottom: 48,
          }}
        >
          Guides, modèles et conseils pratiques rédigés par des freelances, pour des freelances.
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 24,
            marginBottom: 40,
          }}
        >
          {featuredPosts.map((post) => (
            <article
              key={post.slug}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: 16,
                padding: 28,
                transition: 'all 0.2s',
              }}
            >
              <div style={{ fontSize: 32, marginBottom: 12 }}>{post.emoji}</div>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: '#818cf8',
                  marginBottom: 8,
                }}
              >
                {post.category}
              </div>
              <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 10, lineHeight: 1.4, color: 'var(--text-primary)' }}>
                <Link
                  href={`/blog/${post.slug}`}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  {post.title}
                </Link>
              </h3>
              <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 16 }}>
                {post.description.slice(0, 120)}...
              </p>
              <Link
                href={`/blog/${post.slug}`}
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: '#6366f1',
                  textDecoration: 'none',
                }}
              >
                Lire l&apos;article →
              </Link>
            </article>
          ))}
        </div>
        <div style={{ textAlign: 'center' }}>
          <Link
            href="/blog"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '12px 28px',
              borderRadius: 12,
              border: '1px solid var(--border)',
              color: 'var(--text-secondary)',
              textDecoration: 'none',
              fontSize: 14,
              fontWeight: 600,
              transition: 'all 0.2s',
            }}
          >
            Voir tous les articles du blog →
          </Link>
        </div>
      </section>

      <CTABanner />
      <Footer />
    </main>
  );
}
