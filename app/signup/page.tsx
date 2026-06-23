'use client';
import { useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase-client';

export default function SignupPage() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<'form' | 'success'>('form');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.name,
          }
        }
      });

      if (error) {
        alert(error.message);
      } else {
        setStep('success');
      }
    } catch (err: any) {
      alert(err.message || 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  if (step === 'success') {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-primary)', padding: 24 }}>
        <div style={{ textAlign: 'center', maxWidth: 440 }}>
          <div style={{ fontSize: 64, marginBottom: 24 }}>🎉</div>
          <h2 style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 12 }}>Bienvenue dans RelancePro !</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: 32, fontSize: 15 }}>
            Votre compte est créé. Vérifiez votre email pour confirmer votre adresse, puis accédez à votre tableau de bord.
          </p>
          <Link href={email === 'lootthomas2@gmail.com' ? "/dashboard" : "/paywall"} className="btn btn-primary btn-lg">
            {email === 'lootthomas2@gmail.com' ? "Accéder au tableau de bord →" : "Démarrer mon essai gratuit →"}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-primary)', padding: 24 }}>
      <div style={{ position: 'fixed', width: 400, height: 400, background: 'rgba(99,102,241,0.1)', borderRadius: '50%', filter: 'blur(80px)', top: '10%', right: '10%', pointerEvents: 'none' }} />

      <div style={{ width: '100%', maxWidth: 440, position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <Link href="/" style={{ textDecoration: 'none', fontSize: 28, fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--text-primary)', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <span style={{ color: '#6366f1' }}>⚡</span> RelancePro
          </Link>
          <p style={{ color: 'var(--text-muted)', fontSize: 14, marginTop: 8 }}>14 jours gratuits · Sans carte bancaire</p>
        </div>

        {/* Benefits */}
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 28, flexWrap: 'wrap' }}>
          {['✓ Setup en 5 min', '✓ 14j gratuits', '✓ Sans CB'].map(b => (
            <span key={b} style={{ fontSize: 12, background: 'rgba(16,185,129,0.1)', color: '#10b981', padding: '4px 10px', borderRadius: 100, fontWeight: 600 }}>{b}</span>
          ))}
        </div>

        <div className="glass" style={{ padding: 40 }}>
          <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 8, letterSpacing: '-0.02em' }}>Créer mon compte gratuit</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 28 }}>Commencez à récupérer vos impayés dès aujourd&apos;hui</p>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 16 }}>
              <label className="label" htmlFor="signup-name">Votre prénom</label>
              <input id="signup-name" type="text" name="name" className="input" placeholder="Sophie" value={formData.name} onChange={handleChange} required />
            </div>
            <div style={{ marginBottom: 16 }}>
              <label className="label" htmlFor="signup-email">Email professionnel</label>
              <input id="signup-email" type="email" name="email" className="input" placeholder="vous@exemple.fr" value={formData.email} onChange={handleChange} required />
            </div>
            <div style={{ marginBottom: 28 }}>
              <label className="label" htmlFor="signup-password">Mot de passe</label>
              <input id="signup-password" type="password" name="password" className="input" placeholder="Min. 8 caractères" value={formData.password} onChange={handleChange} required minLength={8} />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%', opacity: loading ? 0.7 : 1 }} disabled={loading} id="btn-signup-submit">
              {loading ? 'Création du compte...' : '🚀 Créer mon compte gratuit →'}
            </button>
          </form>

          <div className="divider" />
          <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--text-muted)' }}>
            En créant un compte, j&apos;accepte les <a href="/cgv" style={{ color: '#818cf8' }}>CGV</a> et la <a href="/confidentialite" style={{ color: '#818cf8' }}>politique de confidentialité</a>.
          </p>
          <p style={{ textAlign: 'center', fontSize: 14, color: 'var(--text-muted)', marginTop: 16 }}>
            Déjà un compte ? <Link href="/login" style={{ color: '#818cf8', fontWeight: 600 }}>Se connecter</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
