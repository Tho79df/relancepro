'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase-client';
import { usePlan } from '@/lib/use-plan';
import Link from 'next/link';

const DEFAULT_TEMPLATES = [
  {
    level: 1,
    name: 'Rappel amical',
    delay: 3,
    subject: 'Facture arrivée à échéance',
    body: 'Bonjour,\n\nSauf erreur ou omission de notre part, le paiement de la facture {{invoice_number}} d\'un montant de {{amount}}€, arrivée à échéance le {{due_date}}, ne nous est pas parvenu.\n\nNous vous saurions gré de bien vouloir procéder à son règlement dans les meilleurs délais.\n\nCordialement,'
  },
  {
    level: 2,
    name: 'Seconde relance',
    delay: 10,
    subject: 'Relance : Facture impayée',
    body: 'Bonjour,\n\nNous faisons suite à notre précédent message concernant la facture {{invoice_number}} de {{amount}}€, échue le {{due_date}}.\n\nÀ ce jour, nous n\'avons toujours pas reçu le paiement. Nous vous invitons à régulariser la situation au plus vite.\n\nCordialement,'
  },
  {
    level: 3,
    name: 'Relance formelle',
    delay: 20,
    subject: 'Dernière relance avant mise en demeure',
    body: 'Madame, Monsieur,\n\nMalgré nos précédentes relances, la facture {{invoice_number}} reste impayée à ce jour.\n\nNous vous demandons de bien vouloir procéder au règlement de la somme de {{amount}}€ immédiatement. À défaut de paiement rapide, nous serons contraints de transmettre ce dossier à notre service de recouvrement.\n\nSalutations,'
  },
  {
    level: 4,
    name: 'Mise en demeure',
    delay: 30,
    subject: 'MISE EN DEMEURE DE PAYER',
    body: 'Madame, Monsieur,\n\nPar la présente, nous vous mettons en demeure de payer la somme de {{amount}}€ correspondant à la facture {{invoice_number}}, dont l\'échéance était fixée au {{due_date}}.\n\nÀ défaut de règlement sous 48 heures, nous engagerons les poursuites judiciaires nécessaires pour recouvrer notre créance, avec application des pénalités de retard légales.\n\nSalutations distinguées,'
  }
];

export default function RelancesPage() {
  const [activeTab, setActiveTab] = useState(1);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const { maxRelanceLevels, plan, loading: planLoading } = usePlan();
  
  const [config, setConfig] = useState(DEFAULT_TEMPLATES.map(t => ({ ...t })));

  useEffect(() => {
    async function fetchConfig() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from('relance_sequences')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (data) {
        // Merge DB data with defaults
        setConfig(prev => prev.map(t => ({
          ...t,
          delay: data[`delay_level_${t.level}`] !== null ? data[`delay_level_${t.level}`] : t.delay,
          subject: data[`template_subject_${t.level}`] || t.subject,
          body: data[`template_body_${t.level}`] || t.body,
        })));
      }
      setLoading(false);
    }
    fetchConfig();
  }, []);

  const handleUpdate = (field: 'delay' | 'subject' | 'body', value: string | number) => {
    setConfig(prev => prev.map(t => t.level === activeTab ? { ...t, [field]: value } : t));
  };

  const handleSave = async () => {
    setSaving(true);
    setSaveMessage('');
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (user) {
      const payload: any = { user_id: user.id };
      config.forEach(t => {
        payload[`delay_level_${t.level}`] = t.delay;
        payload[`template_subject_${t.level}`] = t.subject;
        payload[`template_body_${t.level}`] = t.body;
      });

      const { error } = await supabase
        .from('relance_sequences')
        .upsert(payload, { onConflict: 'user_id' });

      if (error) {
        setSaveMessage('Erreur lors de la sauvegarde.');
      } else {
        setSaveMessage('Séquence sauvegardée avec succès ! ✓');
        setTimeout(() => setSaveMessage(''), 3000);
      }
    }
    setSaving(false);
  };

  if (loading) return <div style={{ padding: 40, textAlign: 'center' }}>Chargement...</div>;

  const currentTemplate = config.find(t => t.level === activeTab);

  return (
    <div>
      <div className="top-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.02em' }}>Séquences de Relance</h1>
          <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 2 }}>Configurez vos délais et modèles d'emails automatiques.</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          {saveMessage && <span style={{ fontSize: 13, color: 'var(--success)', fontWeight: 600 }}>{saveMessage}</span>}
          <button className="btn btn-primary btn-sm" onClick={handleSave} disabled={saving}>
            {saving ? 'Sauvegarde...' : 'Enregistrer les modifications'}
          </button>
        </div>
      </div>

      <div className="page-content" style={{ display: 'flex', gap: 32, alignItems: 'flex-start' }}>
        
        {/* Navigation des niveaux (Sidebar) */}
        <div style={{ width: 280, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {config.map((t, index) => {
            const isLocked = maxRelanceLevels > 0 && t.level > maxRelanceLevels;
            return (
            <button
              key={t.level}
              onClick={() => !isLocked && setActiveTab(t.level)}
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
                padding: '16px 20px', borderRadius: 12, border: '1px solid',
                borderColor: isLocked ? 'rgba(239,68,68,0.2)' : activeTab === t.level ? '#6366f1' : 'transparent',
                background: isLocked ? 'rgba(239,68,68,0.04)' : activeTab === t.level ? 'rgba(99,102,241,0.05)' : 'var(--bg-card)',
                color: isLocked ? '#ef4444' : activeTab === t.level ? '#6366f1' : 'var(--text-primary)',
                cursor: isLocked ? 'not-allowed' : 'pointer', textAlign: 'left', transition: 'all 0.2s',
                opacity: isLocked ? 0.6 : 1,
              }}
            >
              <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: isLocked ? '#ef4444' : activeTab === t.level ? '#818cf8' : 'var(--text-muted)', marginBottom: 4 }}>
                {isLocked ? '🔒 PLAN PRO' : `Niveau ${t.level}`}
              </div>
              <div style={{ fontSize: 15, fontWeight: 800, marginBottom: 4 }}>{t.name}</div>
              <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{isLocked ? 'Non disponible sur Starter' : `Envoyé à J+${t.delay}`}</div>
            </button>
            );
          })}
          
          <div style={{ marginTop: 24, padding: 20, background: 'rgba(16,185,129,0.05)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 12 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#10b981', marginBottom: 8 }}>Variables disponibles</div>
            <ul style={{ margin: 0, paddingLeft: 16, fontSize: 12, color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: 4 }}>
              <li><code>{'{{invoice_number}}'}</code></li>
              <li><code>{'{{amount}}'}</code></li>
              <li><code>{'{{due_date}}'}</code></li>
            </ul>
          </div>

          {/* Upgrade CTA for Starter */}
          {plan === 'starter' && (
            <div style={{ marginTop: 12, padding: 20, background: 'rgba(99,102,241,0.05)', border: '1px solid rgba(99,102,241,0.2)', borderRadius: 12 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#818cf8', marginBottom: 6 }}>🚀 Passez au plan Pro</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 12 }}>Déverrouillez le niveau 4 (Mise en demeure) et les factures illimitées.</div>
              <Link href="/dashboard/parametres" style={{ fontSize: 12, fontWeight: 700, color: '#6366f1', textDecoration: 'none' }}>Voir les plans →</Link>
            </div>
          )}
        </div>

        {/* Éditeur (Main content) */}
        {currentTemplate && (
          <div className="card glass" style={{ flex: 1, padding: 32 }}>
            <h2 style={{ fontSize: 18, fontWeight: 800, marginBottom: 24, display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ width: 28, height: 28, background: '#6366f1', color: 'white', borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>
                {activeTab}
              </span>
              Configuration : {currentTemplate.name}
            </h2>

            <div style={{ marginBottom: 24 }}>
              <label className="label">Délai d'envoi</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <input 
                  type="number" 
                  className="input" 
                  style={{ width: 100 }} 
                  min="1" max="90"
                  value={currentTemplate.delay} 
                  onChange={e => handleUpdate('delay', parseInt(e.target.value) || 0)} 
                />
                <span style={{ fontSize: 14, color: 'var(--text-secondary)' }}>jours après la date d'échéance</span>
              </div>
            </div>

            <div className="divider" style={{ margin: '0 -32px 24px -32px' }} />

            <div style={{ marginBottom: 20 }}>
              <label className="label">Sujet de l'email</label>
              <input 
                type="text" 
                className="input" 
                value={currentTemplate.subject} 
                onChange={e => handleUpdate('subject', e.target.value)} 
              />
            </div>

            <div>
              <label className="label">Corps de l'email</label>
              <textarea 
                className="input" 
                rows={12} 
                style={{ resize: 'vertical', fontFamily: 'var(--font-mono), monospace', fontSize: 13, lineHeight: 1.6 }}
                value={currentTemplate.body} 
                onChange={e => handleUpdate('body', e.target.value)} 
              />
            </div>
            
            <div style={{ marginTop: 24, display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn btn-secondary btn-sm" onClick={() => {
                const def = DEFAULT_TEMPLATES.find(t => t.level === activeTab);
                if (def) {
                  handleUpdate('subject', def.subject);
                  handleUpdate('body', def.body);
                }
              }}>Rétablir le texte par défaut</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
