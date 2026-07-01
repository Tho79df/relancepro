import type { Metadata } from 'next';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import { JsonLd } from '@/components/JsonLd';
import { SITE_URL } from '@/lib/metadata';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Gestion impayés pour consultants freelance — RelancePro',
  description:
    'Automatisez vos relances de factures impayées en tant que consultant indépendant. Récupérez vos honoraires sans froisser vos clients. Essai 14j gratuit.',
  keywords: ['relance facture consultant', 'impayé consultant freelance', 'gestion honoraires impayés'],
  alternates: { canonical: `${SITE_URL}/pour-consultants` },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/pour-consultants`,
    title: 'RelancePro pour les consultants freelance',
    description: 'Récupérez vos honoraires sans froisser vos clients.',
  },
};

export default function PourConsultantsPage() {
  const painPoints = [
    {
      emoji: '🤝',
      title: 'Clients grands comptes aux délais à rallonge',
      desc: 'Les grandes entreprises ont des processus de paiement lents. RelancePro envoie des rappels professionnels au bon interlocuteur, au bon moment.',
    },
    {
      emoji: '📊',
      title: 'Factures de mission qui s\'accumulent',
      desc: 'Plusieurs missions, plusieurs clients, plusieurs échéances. Le tableau de bord RelancePro vous donne une vue claire sur tout ce qui est en attente.',
    },
    {
      emoji: '⚖️',
      title: 'Rappel des pénalités légales de retard',
      desc: 'Vos relances peuvent mentionner automatiquement les intérêts légaux de retard (art. L441-6), ce qui accélère généralement le paiement.',
    },
  ];

  return (
    <div style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}>
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Pour les consultants', item: `${SITE_URL}/pour-consultants` },
        ],
      }} />
      <Navbar />
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '140px 24px 80px' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <span style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#818cf8' }}>Pour les consultants freelance</span>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 800, letterSpacing: '-0.03em', marginTop: 12, marginBottom: 20 }}>
            Vos honoraires méritent d&apos;être payés à temps 📊
          </h1>
          <p style={{ fontSize: 18, color: 'var(--text-secondary)', maxWidth: 600, margin: '0 auto 40px' }}>
            RelancePro automatise la gestion de vos impayés. Vous conseillez, RelancePro s&apos;occupe de la trésorerie.
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
            &ldquo;70% de retards de paiement en moins en 2 mois. Simple, efficace, pas besoin de formation.&rdquo;
          </blockquote>
          <div style={{ fontWeight: 700 }}>Amina K. — Consultante RH indépendante</div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
