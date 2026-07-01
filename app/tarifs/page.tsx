import type { Metadata } from 'next';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import { JsonLd } from '@/components/JsonLd';
import { SITE_URL } from '@/lib/metadata';
import Link from 'next/link';
import Pricing from '@/components/landing/Pricing';

export const metadata: Metadata = {
  title: 'Tarifs — Logiciel de relance factures dès 9€/mois',
  description:
    'Comparez les plans RelancePro : Starter 9€/mois, Pro 19€/mois, Studio 39€/mois. Essai gratuit 14 jours sans carte bancaire. Résiliable à tout moment.',
  keywords: ['tarifs logiciel relance', 'prix relancepro', 'abonnement relance facture'],
  alternates: { canonical: `${SITE_URL}/tarifs` },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/tarifs`,
    title: 'Tarifs RelancePro — Dès 9€/mois',
    description: 'Récupérer une seule facture de 500€ couvre 4 ans d\'abonnement Pro.',
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630 }],
  },
};

export default function TarifsPage() {
  return (
    <div style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}>
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Tarifs', item: `${SITE_URL}/tarifs` },
        ],
      }} />
      <Navbar />
      <div style={{ paddingTop: 100 }}>
        <div style={{ textAlign: 'center', padding: '60px 24px 0' }}>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 16 }}>
            Des tarifs simples, sans surprise
          </h1>
          <p style={{ fontSize: 18, color: 'var(--text-secondary)', maxWidth: 560, margin: '0 auto 48px' }}>
            Récupérer une seule facture impayée couvre plusieurs mois d&apos;abonnement. Le ROI est immédiat.
          </p>
        </div>
        <Pricing />
        <div style={{ textAlign: 'center', padding: '40px 24px 80px' }}>
          <div style={{ display: 'inline-flex', flexDirection: 'column', gap: 12, alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', justifyContent: 'center', fontSize: 14, color: 'var(--text-muted)' }}>
              {['✓ Essai 14 jours gratuits', '✓ Sans carte bancaire', '✓ Résiliation en 1 clic', '✓ Données hébergées en Europe'].map(f => (
                <span key={f}>{f}</span>
              ))}
            </div>
            <Link href="/signup" className="btn btn-primary btn-lg" style={{ textDecoration: 'none', marginTop: 16 }}>
              Démarrer mon essai gratuit →
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
