import type { Metadata } from 'next';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import { JsonLd } from '@/components/JsonLd';
import { SITE_URL } from '@/lib/metadata';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'À propos — La startup créée par des freelances, pour les freelances',
  description:
    "RelancePro est né d'une frustration réelle : des heures perdues à relancer des clients. Découvrez l'équipe et la vision derrière l'outil.",
  alternates: { canonical: `${SITE_URL}/a-propos` },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/a-propos`,
    title: 'À propos de RelancePro',
    description: "La startup créée par des freelances pour les freelances.",
  },
};

export default function AProposPage() {
  return (
    <div style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}>
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        '@id': `${SITE_URL}/a-propos`,
        name: 'À propos de RelancePro',
        url: `${SITE_URL}/a-propos`,
        mainEntity: {
          '@type': 'Organization',
          '@id': `${SITE_URL}/#organization`,
          name: 'RelancePro',
          foundingDate: '2026',
          description: 'SaaS de relance automatique de factures impayées pour les freelances français.',
          url: SITE_URL,
          numberOfEmployees: { '@type': 'QuantitativeValue', value: 3 },
        },
      }} />
      <Navbar />
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '140px 24px 80px' }}>
        <div style={{ marginBottom: 64 }}>
          <span style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#818cf8' }}>Notre histoire</span>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 800, letterSpacing: '-0.03em', marginTop: 12, marginBottom: 20, lineHeight: 1.15 }}>
            Créé par un freelance qui en avait assez d&apos;attendre d&apos;être payé
          </h1>
          <p style={{ fontSize: 18, color: 'var(--text-secondary)', lineHeight: 1.8 }}>
            En 2025, après 4 ans de freelance en développement web, notre fondateur a cumulé plus de 18 000€ d&apos;impayés sur 12 mois.
            Non pas par manque de clients, mais par manque d&apos;un système pour les relancer correctement — sans perdre la relation.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24, marginBottom: 64 }}>
          {[
            { value: '500+', label: 'freelances actifs' },
            { value: '12M€', label: 'd\'impayés traités' },
            { value: '4.9/5', label: 'note moyenne' },
            { value: '73%', label: 'de taux de recouvrement' },
          ].map(stat => (
            <div key={stat.label} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14, padding: '24px 20px', textAlign: 'center' }}>
              <div style={{ fontSize: 36, fontWeight: 800, color: '#818cf8', marginBottom: 6 }}>{stat.value}</div>
              <div style={{ fontSize: 14, color: 'var(--text-muted)' }}>{stat.label}</div>
            </div>
          ))}
        </div>

        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 20, padding: 40, marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 16 }}>Notre mission</h2>
          <p style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.8 }}>
            Permettre à chaque freelance, auto-entrepreneur et indépendant français de récupérer l&apos;argent qui lui est dû —
            sans stress, sans awkwardness, sans passer des heures à relancer manuellement.
          </p>
          <p style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.8, marginTop: 16 }}>
            En France, 30% des factures B2B sont payées en retard. C&apos;est inacceptable, et c&apos;est ce que RelancePro résout.
          </p>
        </div>

        <div style={{ textAlign: 'center' }}>
          <Link href="/signup" className="btn btn-primary btn-lg" style={{ textDecoration: 'none' }}>
            Rejoindre RelancePro →
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
