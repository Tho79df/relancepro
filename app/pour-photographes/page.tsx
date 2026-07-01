import type { Metadata } from 'next';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import { JsonLd } from '@/components/JsonLd';
import { SITE_URL } from '@/lib/metadata';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Relance factures impayées pour photographes freelance',
  description: "Automatisez vos relances de factures impayées en tant que photographe freelance. Récupérez l'argent de vos shootings sans froisser vos clients. Essai 14j gratuit.",
  keywords: ['relance facture photographe', 'impayé photographe freelance', 'recouvrement auto-entrepreneur photo'],
  alternates: { canonical: `${SITE_URL}/pour-photographes` },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/pour-photographes`,
    title: 'RelancePro pour les photographes freelance',
    description: 'Récupérez l\'argent de vos shootings sans froisser vos clients.',
  },
};

export default function PourPhotographesPage() {
  const painPoints = [
    { emoji: '📸', title: 'Client qui disparaît après le shooting', desc: 'Vous avez livré les photos, mais le silence radio s\'est installé. RelancePro relance automatiquement, sans que vous ayez à vous battre.' },
    { emoji: '💸', title: 'Acomptes non versés avant la date', desc: 'Configurer une relance pré-échéance pour les acomptes. Rappeler avant même que le délai soit dépassé.' },
    { emoji: '🤝', title: 'Peur d\'abîmer la relation avec des clients réguliers', desc: 'Le ton progressif de RelancePro passe d\'amical à ferme. Vous gardez la relation, vous récupérez l\'argent.' },
  ];
  return (
    <div style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}>
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Pour les photographes', item: `${SITE_URL}/pour-photographes` },
        ],
      }} />
      <Navbar />
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '140px 24px 80px' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <span style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#818cf8' }}>Pour les photographes</span>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 800, letterSpacing: '-0.03em', marginTop: 12, marginBottom: 20 }}>
            Fini les shootings non payés 📸
          </h1>
          <p style={{ fontSize: 18, color: 'var(--text-secondary)', maxWidth: 600, margin: '0 auto 40px' }}>
            RelancePro automatise vos relances de factures impayées pour que vous puissiez vous concentrer sur la photo, pas sur la compta.
          </p>
          <Link href="/signup" className="btn btn-primary btn-lg" style={{ textDecoration: 'none' }}>Essai gratuit 14 jours →</Link>
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
            &ldquo;Un client m\'a réglé 2 900€ en 48h après avoir reçu la mise en demeure PDF. Setup en 5 minutes, efficace dès le premier jour.&rdquo;
          </blockquote>
          <div style={{ fontWeight: 700 }}>Marc-André L. — Photographe professionnel</div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
