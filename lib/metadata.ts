import type { Metadata } from 'next';

export const SITE_URL = 'https://relancepro.fr';
export const SITE_NAME = 'RelancePro';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

export const defaultMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'RelancePro – Relance automatique de factures impayées | Freelances',
    template: '%s | RelancePro',
  },
  description:
    'Automatisez vos relances de factures impayées en 3 clics. Récupérez votre argent sans froisser vos clients. Dès 9€/mois. Essai gratuit 14 jours sans engagement.',
  keywords: [
    'relance facture impayée',
    'logiciel relance client',
    'suivi impayés freelance',
    'auto-entrepreneur facture impayée',
    'relance automatique facture',
    'recouvrement amiable freelance',
  ],
  authors: [{ name: 'RelancePro', url: SITE_URL }],
  creator: 'RelancePro',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: 'RelancePro – Fini les factures impayées pour les freelances',
    description:
      'Relances automatiques, intelligentes et progressives pour récupérer votre argent sans stress. Essai 14 jours gratuits.',
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'RelancePro – Relances automatiques de factures impayées',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@relancepro',
    creator: '@relancepro',
    title: 'RelancePro – Relances automatiques de factures impayées',
    description: 'Automatisez vos relances. Récupérez votre argent. 14 jours gratuits.',
    images: [DEFAULT_OG_IMAGE],
  },
  verification: { google: 'RhKJtU_qDbrdHTHj4-SQVtEMj3-21aHWJq8MvwnB2fY' },
  alternates: { canonical: SITE_URL },
};
