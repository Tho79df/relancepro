'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase-client';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
      } else {
        router.push('/dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--bg-primary)',
        padding: '24px',
      }}
    >
      {/* Background orbs */}
      <div style={{ position: 'fixed', width: 400, height: 400, background: 'rgba(99,102,241,0.1)', borderRadius: '50%', filter: 'blur(80px)', top: '10%', left: '20%', pointerEvents: 'none' }} />
      <div style={{ position: 'fixed', width: 300, height: 300, background: 'rgba(139,92,246,0.08)', borderRadius: '50%', filter: 'blur(80px)', bottom: '20%', right: '20%', pointerEvents: 'none' }} />

      <div style={{ width: '100%', maxWidth: 440, position: 'relative', zIndex: 1 }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <Link href="/" style={{ textDecoration: 'none', fontSize: 28, fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--text-primary)', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <span style={{ color: '#6366f1' }}>⚡</span> RelancePro
          </Link>
          <p style={{ color: 'var(--text-muted)', fontSize: 14, marginTop: 8 }}>Content de vous revoir 👋</p>
        </div>

        <div className="glass" style={{ padding: 40 }}>
          <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 8, letterSpacing: '-0.02em' }}>Connexion</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 28 }}>Accédez à votre tableau de bord</p>

          {error && (
            <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 10, padding: '12px 16px', marginBottom: 20, fontSize: 14, color: '#ef4444' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 16 }}>
              <label className="label" htmlFor="login-email">Email</label>
              <input
                id="login-email"
                type="email"
                className="input"
                placeholder="vous@exemple.fr"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div style={{ marginBottom: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <label className="label" htmlFor="login-password" style={{ margin: 0 }}>Mot de passe</label>
                <a href="/reset-password" style={{ fontSize: 12, color: '#818cf8', textDecoration: 'none' }}>Oublié ?</a>
              </div>
              <input
                id="login-password"
                type="password"
                className="input"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: '100%', opacity: loading ? 0.7 : 1 }}
              disabled={loading}
              id="btn-login-submit"
            >
              {loading ? 'Connexion...' : 'Se connecter →'}
            </button>
          </form>

          <div className="divider" />

          <p style={{ textAlign: 'center', fontSize: 14, color: 'var(--text-muted)' }}>
            Pas encore de compte ?{' '}
            <Link href="/signup" style={{ color: '#818cf8', textDecoration: 'none', fontWeight: 600 }}>Créer un compte gratuit</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
