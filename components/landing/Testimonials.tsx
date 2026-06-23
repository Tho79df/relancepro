export default function Testimonials() {
  const testimonials = [
    {
      stars: '★★★★★',
      text: '"J\'avais une facture de 1 800€ qui traînait depuis 45 jours. Après 2 relances automatiques via RelancePro, le client a payé en 72h. Je n\'aurais jamais osé relancer moi-même aussi fermement."',
      name: 'Sophie M.',
      role: 'Graphiste freelance, Lyon',
      initials: 'SM',
    },
    {
      stars: '★★★★★',
      text: '"En tant que dev freelance, j\'avais honte de parler d\'argent avec mes clients. RelancePro le fait à ma place, professionnellement. 3 factures récupérées dès le premier mois."',
      name: 'Thomas D.',
      role: 'Développeur web, Paris',
      initials: 'TD',
    },
    {
      stars: '★★★★★',
      text: '"J\'ai enfin un outil qui correspond à ma réalité d\'auto-entrepreneur. Simple, efficace, pas besoin de formation. Et les résultats sont là : -70% de retards de paiement en 2 mois."',
      name: 'Amina K.',
      role: 'Consultante marketing, Bordeaux',
      initials: 'AK',
    },
    {
      stars: '★★★★★',
      text: '"La mise en demeure PDF a été un game-changer. Un client qui refusait de payer depuis 3 mois a réglé 2 900€ en 48h après avoir reçu le document officiel. Ça vaut vraiment l\'abonnement."',
      name: 'Marc-André L.',
      role: 'Photographe professionnel, Nantes',
      initials: 'ML',
    },
  ];

  return (
    <section className="section" style={{ background: 'rgba(0,0,0,0.2)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <div className="badge badge-success" style={{ marginBottom: 16, display: 'inline-flex' }}>Témoignages</div>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 16 }}>
            Ils ont récupéré leur argent. <span className="gradient-text">Pour de vrai.</span>
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
          {testimonials.map((t) => (
            <div key={t.name} className="testimonial-card">
              <div className="testimonial-stars">{t.stars}</div>
              <p className="testimonial-text">{t.text}</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">{t.initials}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{t.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
