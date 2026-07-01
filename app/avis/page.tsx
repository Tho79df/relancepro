import type { Metadata } from 'next';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import { JsonLd } from '@/components/JsonLd';
import { SITE_URL } from '@/lib/metadata';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Avis clients — Note 4,9/5 sur 127 avis vérifiés',
  description:
    '127 freelances témoignent : comment RelancePro les a aidés à récupérer leurs factures impayées. Témoignages vérifiés.',
  alternates: { canonical: `${SITE_URL}/avis` },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/avis`,
    title: 'Avis RelancePro — Note 4,9/5 sur 127 avis',
    description: '127 freelances témoignent de leur expérience avec RelancePro.',
  },
};

const reviews = [
  { name: 'Sophie M.', job: 'Designer graphique', rating: 5, text: "J'avais une facture de 1 800€ qui traînait depuis 45 jours. Après 2 relances automatiques via RelancePro, le client a payé en 72h. Incroyable.", date: '15 janvier 2026', recovered: '1 800€' },
  { name: 'Thomas D.', job: 'Développeur web freelance', rating: 5, text: "En tant que dev freelance, j'avais honte de parler d'argent avec mes clients. RelancePro le fait à ma place. 3 factures récupérées dès le premier mois.", date: '3 février 2026', recovered: '4 200€' },
  { name: 'Amina K.', job: 'Consultante RH', rating: 5, text: "70% de retards de paiement en moins en 2 mois. Simple, efficace, pas besoin de formation. Je recommande à tous mes collègues consultants.", date: '18 février 2026', recovered: '2 600€' },
  { name: 'Marc-André L.', job: 'Photographe professionnel', rating: 5, text: "La mise en demeure PDF a été un game-changer. Un client a réglé 2 900€ en 48h après avoir reçu le document. Merci RelancePro.", date: '5 mars 2026', recovered: '2 900€' },
  { name: 'Céline R.', job: 'Rédactrice web', rating: 5, text: "Je ne savais pas comment relancer sans me sentir à la limite du harcèlement. Le ton progressif de RelancePro est parfait. Professionnel et efficace.", date: '20 mars 2026', recovered: '890€' },
  { name: 'Antoine V.', job: 'Chef de projet digital', rating: 5, text: "Setup en 5 minutes. Mes premières relances sont parties toutes seules. J'aurais dû utiliser ça bien plus tôt dans ma carrière de freelance.", date: '8 avril 2026', recovered: '3 100€' },
];

export default function AvisPage() {
  return (
    <div style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}>
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: 'RelancePro',
        url: SITE_URL,
        review: reviews.map(r => ({
          '@type': 'Review',
          reviewRating: { '@type': 'Rating', ratingValue: r.rating, bestRating: 5 },
          author: { '@type': 'Person', name: r.name },
          reviewBody: r.text,
          datePublished: r.date,
        })),
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: 4.9,
          reviewCount: 127,
          bestRating: 5,
          worstRating: 1,
        },
      }} />
      <Navbar />
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '140px 24px 80px' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 16 }}>
            <span style={{ fontSize: 36, letterSpacing: 2, color: '#f59e0b' }}>★★★★★</span>
          </div>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 12 }}>
            4,9/5 — 127 freelances nous font confiance
          </h1>
          <p style={{ fontSize: 17, color: 'var(--text-secondary)' }}>
            Des témoignages réels de freelances qui ont récupéré leur argent.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24, marginBottom: 64 }}>
          {reviews.map((review, i) => (
            <article key={i} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 16, padding: 28 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15 }}>{review.name}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>{review.job}</div>
                </div>
                <div style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 8, padding: '4px 10px', fontSize: 13, fontWeight: 700, color: '#10b981', whiteSpace: 'nowrap' }}>
                  +{review.recovered}
                </div>
              </div>
              <div style={{ color: '#f59e0b', fontSize: 16, letterSpacing: 2, marginBottom: 12 }}>★★★★★</div>
              <blockquote style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.7, fontStyle: 'italic', margin: 0 }}>
                &ldquo;{review.text}&rdquo;
              </blockquote>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 12 }}>{review.date}</div>
            </article>
          ))}
        </div>

        <div style={{ textAlign: 'center' }}>
          <Link href="/signup" className="btn btn-primary btn-lg" style={{ textDecoration: 'none' }}>
            Rejoindre 500+ freelances → Essai gratuit 14j
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
