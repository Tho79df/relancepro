import type { Metadata, Viewport } from 'next';
import { Analytics } from '@vercel/analytics/react';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'RelancePro – Relance automatique de factures impayées | Freelances',
    template: '%s | RelancePro',
  },
  description:
    'Automatisez vos relances de factures impayées en 3 clics. Récupérez votre argent sans froisser vos clients. Dès 9€/mois. Essai gratuit 14 jours sans engagement.',
  keywords:
    'relance facture impayée, logiciel relance client, suivi impayés freelance, auto-entrepreneur facture impayée, relance automatique facture, recouvrement amiable freelance',
  authors: [{ name: 'RelancePro' }],
  metadataBase: new URL('https://relancepro.fr'),
  alternates: { canonical: 'https://relancepro.fr' },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://relancepro.fr',
    siteName: 'RelancePro',
    title: 'RelancePro – Fini les factures impayées pour les freelances',
    description:
      'Relances automatiques, intelligentes et progressives pour récupérer votre argent sans stress. Essai 14 jours gratuits.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'RelancePro – Relances automatiques' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RelancePro – Relances automatiques de factures impayées',
    description: 'Automatisez vos relances. Récupérez votre argent. 14 jours gratuits.',
    images: ['/og-image.png'],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <head>
        <meta name="google-site-verification" content="RhKJtU_qDbrdHTHj4-SQVtEMj3-21aHWJq8MvwnB2fY" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SoftwareApplication',
              name: 'RelancePro',
              applicationCategory: 'BusinessApplication',
              operatingSystem: 'Web',
              description:
                'Logiciel de relance automatique de factures impayées pour freelances et auto-entrepreneurs français.',
              offers: [
                {
                  '@type': 'Offer',
                  price: '9',
                  priceCurrency: 'EUR',
                  description: 'Plan Starter – 5 factures actives',
                },
                {
                  '@type': 'Offer',
                  price: '19',
                  priceCurrency: 'EUR',
                  description: 'Plan Pro – Factures illimitées + PDF mise en demeure',
                },
              ],
            }),
          }}
        />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
