'use client';
import { useState } from 'react';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import Link from 'next/link';


export default function CalculateurPage() {
  return <CalculateurClient />;
}

function CalculateurClient() {
  const [montant, setMontant] = useState('');
  const [delai, setDelai] = useState('30');
  const [tauxHoraire, setTauxHoraire] = useState('80');
  const [result, setResult] = useState<null | { coutTemps: number; interets: number; totalPerdu: number; tempsPerdu: number }>(null);

  const calculate = () => {
    const m = parseFloat(montant) || 0;
    const d = parseInt(delai) || 0;
    const th = parseFloat(tauxHoraire) || 0;
    // Taux légal de pénalité de retard : 3× taux directeur BCE (estimé à 10,5% annuel en 2026)
    const tauxAnnuel = 0.105;
    const interets = m * tauxAnnuel * (d / 365);
    const tempsPerdu = d * 0.15; // ~9 min/jour en stress + relances manuelles
    const coutTemps = tempsPerdu * th;
    const totalPerdu = interets + coutTemps;
    setResult({ coutTemps: Math.round(coutTemps), interets: Math.round(interets * 100) / 100, totalPerdu: Math.round(totalPerdu), tempsPerdu: Math.round(tempsPerdu * 10) / 10 });
  };

  return (
    <div style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}>
      <Navbar />
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '140px 24px 80px' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <span style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#818cf8' }}>Outil gratuit</span>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, letterSpacing: '-0.03em', marginTop: 12, marginBottom: 16 }}>
            Combien vous coûtent vos factures impayées ?
          </h1>
          <p style={{ fontSize: 17, color: 'var(--text-secondary)', maxWidth: 540, margin: '0 auto' }}>
            Calculez en 30 secondes le coût réel de vos impayés : intérêts légaux + temps perdu à relancer.
          </p>
        </div>

        <div className="card" style={{ padding: 40, marginBottom: 32 }}>
          <div style={{ display: 'grid', gap: 24 }}>
            <div>
              <label className="label" htmlFor="calc-montant">Montant total des factures impayées (€)</label>
              <input
                id="calc-montant"
                type="number"
                className="input"
                placeholder="ex : 3500"
                value={montant}
                onChange={e => setMontant(e.target.value)}
                min="0"
              />
            </div>
            <div>
              <label className="label" htmlFor="calc-delai">Délai moyen de retard (jours)</label>
              <input
                id="calc-delai"
                type="number"
                className="input"
                value={delai}
                onChange={e => setDelai(e.target.value)}
                min="1"
                max="365"
              />
            </div>
            <div>
              <label className="label" htmlFor="calc-taux">Votre taux horaire (€/h)</label>
              <input
                id="calc-taux"
                type="number"
                className="input"
                value={tauxHoraire}
                onChange={e => setTauxHoraire(e.target.value)}
                min="10"
              />
            </div>
            <button
              onClick={calculate}
              className="btn btn-primary"
              style={{ width: '100%', padding: '16px' }}
            >
              Calculer mon coût réel →
            </button>
          </div>
        </div>

        {result && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20, marginBottom: 40 }}>
            {[
              { label: 'Intérêts légaux de retard', value: `${result.interets}€`, color: '#f59e0b', icon: '⚖️', sub: 'Art. L441-6 Code de commerce' },
              { label: 'Temps perdu à relancer', value: `${result.tempsPerdu}h`, color: '#ef4444', icon: '⏰', sub: `Valorisé à ${result.coutTemps}€` },
              { label: 'Coût total estimé', value: `${result.totalPerdu}€`, color: '#6366f1', icon: '💸', sub: 'Manque à gagner réel' },
            ].map(s => (
              <div key={s.label} style={{ background: `${s.color}11`, border: `1px solid ${s.color}33`, borderRadius: 14, padding: '20px 18px', textAlign: 'center' }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{s.icon}</div>
                <div style={{ fontSize: 28, fontWeight: 800, color: s.color, marginBottom: 4 }}>{s.value}</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>{s.label}</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{s.sub}</div>
              </div>
            ))}
          </div>
        )}

        {result && (
          <div style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)', borderRadius: 16, padding: 28, textAlign: 'center' }}>
            <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>
              RelancePro coûte 19€/mois et vous aurait évité {result.totalPerdu}€ de pertes.
            </div>
            <div style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 20 }}>
              Soit un ROI de ×{Math.round(result.totalPerdu / 19)} en un seul mois.
            </div>
            <Link href="/signup" className="btn btn-primary" style={{ textDecoration: 'none' }}>
              Récupérer mon argent — Essai gratuit 14j →
            </Link>
          </div>
        )}

        <div style={{ marginTop: 40, padding: 20, background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 12, fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.7 }}>
          <strong>Méthodologie :</strong> Les intérêts légaux sont calculés sur la base de 3× le taux directeur de la BCE (estimé à 10,5% annuel, conformément à l&apos;art. L441-6 du Code de commerce). Le coût en temps est estimé à 9 minutes par jour de retard, valorisé à votre taux horaire déclaré.
        </div>
      </div>
      <Footer />
    </div>
  );
}
