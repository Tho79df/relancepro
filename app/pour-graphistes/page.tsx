import type { Metadata } from 'next';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import { JsonLd } from '@/components/JsonLd';
import { SITE_URL } from '@/lib/metadata';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Relance facture graphiste auto-entrepreneur — RelancePro',
  description:
    'Automatisez vos relances de factures impayées en tant que graphiste freelance ou auto-entrepreneur. Récupérez vos créances sans stress. Essai 14j gratuit.',
  keywords: ['relance facture graphiste', 'impayé graphiste auto-entrepreneur', 'recouvrement designer freelance'],
  alternates: { canonical: `${SITE_URL}/pour-graphistes` },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/pour-graphistes`,
    title: 'RelancePro pour les graphistes freelance',
    description: 'Récupérez vos créances sans stress.',
  },
};

export default function PourGraphistesPage() {
  const painPoints = [
    {
      emoji: '🎨',
      title: 'Client qui "adore" le travail mais tarde à payer',
      desc: 'Les retours enthousiastes ne paient pas les factures. RelancePro envoie les rappels à votre place avec le bon ton, au bon moment.',
    },
    {
      emoji: '🔄',
      title: 'Révisions infinies, paiement qui attend',
      desc: 'Configurez des relances qui partent automatiquement à l\'échéance, même pendant une phase de révision en cours.',
    },
    {
      emoji: '📋',
      title: 'Acomptes et soldes difficiles à suivre',
      desc: 'Gérez facilement les acomptes et les soldes. RelancePro suit l\'historique de chaque facture et vous alerte automatiquement.',
    },
  ];

  return (
    <div style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}>
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Pour les graphistes', item: `${SITE_URL}/pour-graphistes` },
        ],
      }} />
      <Navbar />
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '140px 24px 80px' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <span style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#818cf8' }}>Pour les graphistes freelance</span>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 800, letterSpacing: '-0.03em', marginTop: 12, marginBottom: 20 }}>
            Créez. RelancePro s&apos;occupe d&apos;être payé 🎨
          </h1>
          <p style={{ fontSize: 18, color: 'var(--text-secondary)', maxWidth: 600, margin: '0 auto 40px' }}>
            Automatisez vos relances de factures impayées. Concentrez-vous sur votre créativité, pas sur la comptabilité.
          </p>
          <Link href="/signup" className="btn btn-primary btn-lg" style={{ textDecoration: 'none' }}>
            Essai gratuit 14 jours →
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24, marginBottom: 64 }}>
          {painPoints.map(p => (
            <div key={p.title} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 16, padding: 28 }}>
              <div style={{ fontSize: 36, marginBottom: 12 }}>{p.emoji}</div>
              <h2 style={{ fontSize: 17, fontWeight: 700, marginBottom: 10, color: 'var(--text-primary)' }}>{p.title}</h2>
              <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{p.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)', borderRadius: 20, padding: '40px 32px', textAlign: 'center' }}>
          <div style={{ fontSize: 28, marginBottom: 12 }}>💬</div>
          <blockquote style={{ fontSize: 18, fontStyle: 'italic', color: 'var(--text-secondary)', maxWidth: 600, margin: '0 auto 16px', lineHeight: 1.7 }}>
            &ldquo;J&apos;avais une facture de 1 800€ qui traînait depuis 45 jours. Après 2 relances automatiques, le client a payé en 72h.&rdquo;
          </blockquote>
          <div style={{ fontWeight: 700 }}>Sophie M. — Designer graphique freelance</div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
