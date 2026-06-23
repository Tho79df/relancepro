'use client';
import { useState } from 'react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Combien de temps faut-il pour commencer ?',
      a: 'Environ 5 minutes. Vous créez votre compte, ajoutez votre première facture, configurez la séquence de relances, et c\'est parti. Pas de formation, pas d\'intégration complexe.',
    },
    {
      q: 'Est-ce que les emails vont froisser mes clients ?',
      a: 'Nos templates sont conçus pour être professionnels et empathiques. La première relance est amicale ("juste un rappel"), les suivantes deviennent progressivement plus fermes. Vous pouvez personnaliser chaque message selon votre style.',
    },
    {
      q: 'Mes clients verront-ils que j\'utilise un logiciel ?',
      a: 'Non. Les emails partent de votre adresse email, avec votre nom. Vos clients penseront que vous avez envoyé le message personnellement.',
    },
    {
      q: 'Que se passe-t-il si mon client paie entre deux relances ?',
      a: 'Il vous suffit de marquer la facture comme "payée" dans votre tableau de bord. RelancePro stoppe immédiatement toutes les relances programmées.',
    },
    {
      q: 'La mise en demeure PDF est-elle légalement valable ?',
      a: 'Le document généré suit le modèle standard français incluant toutes les mentions légales requises (montant, date, délai de règlement, mention des pénalités de retard). Il n\'est cependant pas signé par un avocat. Pour les litiges complexes, un professionnel du droit reste recommandé.',
    },
    {
      q: 'Puis-je essayer gratuitement ?',
      a: 'Oui ! Vous avez 14 jours d\'essai gratuit sur tous les plans. Aucune carte bancaire requise. Et si vous n\'êtes pas satisfait dans les 30 jours suivant votre abonnement, on vous rembourse intégralement.',
    },
    {
      q: 'Mes données sont-elles sécurisées ?',
      a: 'RelancePro utilise Supabase (hébergé en Europe) pour le stockage des données, avec un chiffrement complet. Nous sommes conformes au RGPD. Vos données ne sont jamais partagées avec des tiers.',
    },
    {
      q: 'Comment fonctionnent les abonnements ?',
      a: 'Le paiement est mensuel, prélevé automatiquement. Vous pouvez changer de plan ou résilier à tout moment depuis votre tableau de bord. Aucun engagement, aucune surprise.',
    },
  ];

  return (
    <section className="section">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <div className="badge badge-muted" style={{ marginBottom: 16, display: 'inline-flex' }}>FAQ</div>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 16 }}>
            Questions fréquentes
          </h2>
        </div>

        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          {faqs.map((faq, i) => (
            <div key={i} className="faq-item">
              <div
                className="faq-question"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && setOpenIndex(openIndex === i ? null : i)}
              >
                <span style={{ fontSize: 15, fontWeight: 600 }}>{faq.q}</span>
                <span
                  style={{
                    fontSize: 20,
                    transition: 'transform 0.3s ease',
                    transform: openIndex === i ? 'rotate(45deg)' : 'none',
                    color: openIndex === i ? '#6366f1' : 'var(--text-muted)',
                  }}
                >
                  +
                </span>
              </div>
              {openIndex === i && (
                <div className="faq-answer">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Schema JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((f) => ({
              '@type': 'Question',
              name: f.q,
              acceptedAnswer: { '@type': 'Answer', text: f.a },
            })),
          }),
        }}
      />
    </section>
  );
}
