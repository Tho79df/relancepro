'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase-client';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

const faqs = [
  {
    q: 'Pourquoi demandez-vous ma carte bancaire ?',
    a: 'Une empreinte bancaire est requise pour activer votre essai et éviter les abus. Elle garantit la continuité du service à la fin de l\'essai. Vous ne serez absolument pas débité avant le 14ème jour.',
  },
  {
    q: 'Puis-je annuler en 1 clic ?',
    a: 'Oui, à tout moment depuis vos Paramètres → Abonnement. L\'annulation est instantanée, sans formulaire, sans service client à appeler. Zéro friction.',
  },
  {
    q: 'Que se passe-t-il après les 14 jours ?',
    a: 'Vous recevrez un email de rappel 3 jours avant la fin de votre essai. Si vous ne faites rien, le Plan Pro (19€/mois) sera activé automatiquement. Si vous annulez, vous perdez l\'accès immédiatement.',
  },
  {
    q: 'Mes données sont-elles sécurisées ?',
    a: 'Nous ne stockons aucun numéro de carte. Tout le paiement est géré par Stripe, le standard de sécurité de l\'industrie (certifié PCI DSS niveau 1, utilisé par Amazon, Shopify, etc.).',
  },
];

function PaywallContent() {
  const [loading, setLoading] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const wasCanceled = searchParams.get('canceled') === 'true';

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan: 'pro' }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || 'Erreur lors de la redirection vers Stripe');
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      alert('Erreur réseau. Veuillez réessayer.');
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/login');
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', padding: '40px 24px' }}>
      {/* Orb de fond */}
      <div style={{ position: 'fixed', width: 700, height: 700, background: 'rgba(99,102,241,0.04)', borderRadius: '50%', filter: 'blur(120px)', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 560, margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <a href="/" style={{ textDecoration: 'none', fontSize: 20, fontWeight: 800, color: 'var(--text-primary)', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <span style={{ color: '#6366f1', fontSize: 22 }}>⚡</span> RelancePro
          </a>
        </div>

        {/* Message d'annulation */}
        {wasCanceled && (
          <div style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.3)', borderRadius: 12, padding: '14px 20px', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 20 }}>🤔</span>
            <div>
              <div style={{ fontWeight: 700, color: '#f59e0b', marginBottom: 2 }}>Pas encore convaincu ?</div>
              <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Pas de problème ! Votre compte est sauvegardé. Relisez les garanties ci-dessous et réessayez quand vous voulez.</div>
            </div>
          </div>
        )}

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: 100, padding: '6px 16px', marginBottom: 20, fontSize: 13, fontWeight: 700, color: '#10b981' }}>
            ✓ 14 jours gratuits — Aucun prélèvement aujourd'hui
          </div>
          <h1 style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 12 }}>
            Une dernière étape
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 15, lineHeight: 1.7 }}>
            Commencez à récupérer votre argent dès maintenant. Votre carte ne sera débitée qu'après l'essai.
          </p>
        </div>

        {/* Frise chronologique */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14, padding: '20px 24px', marginBottom: 24 }}>
          <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)', marginBottom: 16 }}>Ce qui va se passer</div>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 0, position: 'relative' }}>
            {[
              { label: 'Aujourd\'hui', desc: '0€ débité · Accès complet', color: '#6366f1', icon: '🚀' },
              { label: 'Jour 11', desc: 'Email de rappel envoyé', color: '#f59e0b', icon: '📧' },
              { label: 'Jour 14', desc: 'Premier paiement : 19€', color: '#10b981', icon: '✓' },
            ].map((step, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', position: 'relative' }}>
                {i < 2 && (
                  <div style={{ position: 'absolute', top: 16, left: '50%', width: '100%', height: 2, background: `linear-gradient(90deg, ${step.color}, #ffffff15)`, zIndex: 0 }} />
                )}
                <div style={{ width: 34, height: 34, borderRadius: '50%', background: `${step.color}22`, border: `2px solid ${step.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, zIndex: 1, position: 'relative', marginBottom: 8 }}>
                  {step.icon}
                </div>
                <div style={{ fontSize: 12, fontWeight: 700, color: step.color, marginBottom: 2 }}>{step.label}</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', lineHeight: 1.4 }}>{step.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Card plan */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid rgba(99,102,241,0.4)', borderRadius: 20, padding: 32, boxShadow: '0 0 40px rgba(99,102,241,0.1)', marginBottom: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
            <div>
              <div style={{ display: 'inline-block', background: 'rgba(99,102,241,0.15)', color: '#818cf8', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', padding: '4px 10px', borderRadius: 100, marginBottom: 8 }}>Plan Pro</div>
              <div style={{ fontSize: 28, fontWeight: 800, display: 'flex', alignItems: 'baseline', gap: 4 }}>
                0€ <span style={{ fontSize: 14, color: 'var(--text-muted)', fontWeight: 500 }}>pendant 14 jours</span>
              </div>
              <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>puis 19€/mois — Annulable à tout moment</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 12, color: 'var(--success)', fontWeight: 700 }}>🔒 Paiement sécurisé</div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>via Stripe</div>
            </div>
          </div>

          <div style={{ marginBottom: 28 }}>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                ['Factures illimitées', '📄'],
                ['Relances automatiques (4 niveaux)', '🤖'],
                ['Templates d\'emails personnalisables', '✏️'],
                ['Export PDF Mise en demeure', '⚖️'],
                ['Support prioritaire', '💬'],
              ].map(([feat, icon]) => (
                <li key={feat} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: 'var(--text-primary)' }}>
                  <span>{icon}</span>
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          <button
            onClick={handleCheckout}
            disabled={loading}
            style={{
              width: '100%', padding: '16px', borderRadius: 14, border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: 'white', fontSize: 16, fontWeight: 700,
              boxShadow: '0 4px 20px rgba(99,102,241,0.4)', transition: 'all 0.2s', opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? '⏳ Chargement...' : '🚀 Démarrer mes 14 jours gratuits'}
          </button>

          <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--text-muted)', marginTop: 14, lineHeight: 1.5 }}>
            Aucun prélèvement aujourd'hui. Rappel par email 3 jours avant la fin de l'essai.
          </p>
        </div>

        {/* Garanties */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 32 }}>
          {[
            { icon: '🔒', label: 'Paiement 100% sécurisé', sub: 'Stripe · PCI DSS' },
            { icon: '🚫', label: 'Annulation 1 clic', sub: 'Sans engagement' },
            { icon: '🛡️', label: 'Données protégées', sub: 'RGPD compliant' },
          ].map(g => (
            <div key={g.label} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 12, padding: '14px 12px', textAlign: 'center' }}>
              <div style={{ fontSize: 20, marginBottom: 4 }}>{g.icon}</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 2 }}>{g.label}</div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{g.sub}</div>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 16, fontWeight: 800, marginBottom: 16, textAlign: 'center', color: 'var(--text-primary)' }}>Questions fréquentes</h2>
          {faqs.map((faq, i) => (
            <div key={i} style={{ border: '1px solid var(--border)', borderRadius: 10, marginBottom: 8, overflow: 'hidden', background: 'var(--bg-card)' }}>
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                style={{ width: '100%', padding: '14px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-primary)', fontSize: 14, fontWeight: 600, textAlign: 'left' }}
              >
                {faq.q}
                <span style={{ fontSize: 18, color: 'var(--text-muted)', flexShrink: 0 }}>{openFaq === i ? '−' : '+'}</span>
              </button>
              {openFaq === i && (
                <div style={{ padding: '0 18px 16px', fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Déconnexion */}
        <div style={{ textAlign: 'center' }}>
          <button
            onClick={handleLogout}
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: 13, cursor: 'pointer', textDecoration: 'underline' }}
          >
            Me déconnecter
          </button>
        </div>
      </div>
    </div>
  );
}

export default function PaywallPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }} />}>
      <PaywallContent />
    </Suspense>
  );
}
