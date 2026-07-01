// Ce fichier exporte uniquement la metadata (côté serveur).
// La page elle-même est 'use client' donc on sépare les deux.
import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/metadata';

export const generateurMetadata: Metadata = {
  title: 'Générateur de lettre de relance gratuit — Email en 30 secondes',
  description:
    "Créez votre email de relance personnalisé gratuitement : 4 niveaux d'urgence, conforme au droit français (L441-6 Code de commerce). Aucune inscription requise.",
  keywords: [
    'générateur lettre relance',
    'modèle email relance facture gratuit',
    'lettre mise en demeure gratuite',
    'relance client facture impayée',
  ],
  alternates: { canonical: `${SITE_URL}/outils/generateur-relance` },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/outils/generateur-relance`,
    title: 'Générateur de lettre de relance gratuit | RelancePro',
    description:
      "Créez votre lettre de relance personnalisée en 30 secondes. 4 niveaux d'urgence. Aucune inscription.",
    images: [
      {
        url: `${SITE_URL}/api/og?title=Générateur de lettre de relance gratuit&category=Outil gratuit`,
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Générateur de lettre de relance gratuit',
    description: "4 niveaux d'urgence. Conforme au droit français. Aucune inscription.",
    images: [
      `${SITE_URL}/api/og?title=Générateur de lettre de relance gratuit&category=Outil gratuit`,
    ],
  },
};
