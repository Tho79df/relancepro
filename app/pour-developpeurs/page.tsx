import type { Metadata } from 'next';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import { JsonLd } from '@/components/JsonLd';
import { SITE_URL } from '@/lib/metadata';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Logiciel relance factures pour développeurs web freelance',
  description: 'Automatisez vos relances de factures impayées en tant que développeur freelance. Fini les projets livrés sans être payé. Essai gratuit 14 jours.',
  keywords: ['relance facture développeur freelance', 'impayé développeur web', 'logiciel relance client dev'],
  alternates: { canonical: `${SITE_URL}/pour-developpeurs` },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/pour-developpeurs`,
    title: 'RelancePro pour les développeurs freelance',
    description: 'Fini les projets livrés sans être payé.',
  },
};

export default function PourDeveloppeurPage() {
  const painPoints = [
    { emoji: '💻', title: 'Projet livré, client injoignable', desc: 'Vous avez merged la dernière PR, mais la facture traîne. RelancePro envoie la relance automatiquement à J+3, J+10, J+20.' },
    { emoji: '🚀', title: 'Clients startup qui ont des problèmes de trésorerie', desc: 'Relances progressives et professionnelles. Vous préservez la relation commerciale tout en récupérant votre argent.' },
    { emoji: '⚖️', title: 'Mise en demeure PDF en 1 clic', desc: 'Si tout le reste échoue, générez une mise en demeure légale conforme au droit français. Souvent suffisant pour débloquer un paiement.' },
  ];
  return (
    <div style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}>
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Pour les développeurs', item: `${SITE_URL}/pour-developpeurs` },
        ],
      }} />
      <Navbar />
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '140px 24px 80px' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <span style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#818cf8' }}>Pour les développeurs freelance</span>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 800, letterSpacing: '-0.03em', marginTop: 12, marginBottom: 20 }}>
            Déployez votre code, pas vos relances 💻
          </h1>
          <p style={{ fontSize: 18, color: 'var(--text-secondary)', maxWidth: 600, margin: '0 auto 40px' }}>
            RelancePro automatise vos relances de factures impayées. Vous codez, RelancePro s\'occupe d\'être payé.
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
            &ldquo;En tant que dev freelance, j\'avais honte de parler d\'argent avec mes clients. RelancePro le fait à ma place. 3 factures récupérées dès le premier mois.&rdquo;
          </blockquote>
          <div style={{ fontWeight: 700 }}>Thomas D. — Développeur web freelance</div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
