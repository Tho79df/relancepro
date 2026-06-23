import { NextResponse } from 'next/server';
import { sendRelanceEmail } from '@/lib/resend';
import { createClient } from '@supabase/supabase-js';

// Ce endpoint peut être appelé manuellement (ex: par le clic sur un bouton) 
// ou par le CRON Supabase
export async function POST(request: Request) {
  try {
    const { to, subject, html, invoiceId, level } = await request.json();

    if (!to || !subject || !html) {
      return NextResponse.json({ error: 'Champs manquants' }, { status: 400 });
    }

    // Par défaut en dev (quand on utilise onboarding@resend.dev), Resend bloque l'envoi vers 
    // des adresses autres que celle du propriétaire du compte. On force donc l'envoi vers
    // onboarding@resend.dev qui relaie en réalité à l'adresse de compte. 
    // OU on garde "to" tel quel, car Resend gère ça au niveau de la clé API.
    // L'idéal en local est d'utiliser un flag ou de l'envoyer à un dev_email.
    const devMode = process.env.NODE_ENV === 'development';
    const emailTo = devMode ? process.env.FROM_EMAIL || 'onboarding@resend.dev' : to;

    const result = await sendRelanceEmail({
      to: emailTo,
      subject: devMode ? `[DEV - Pour: ${to}] ${subject}` : subject,
      html,
    });

    if (result.success && invoiceId) {
      // Optionnel: loguer l'email dans la base de données
      const supabaseAdmin = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
      );
      
      await supabaseAdmin.from('relance_emails').insert({
        invoice_id: invoiceId,
        level: level || 1,
        email_to: to,
        subject: subject,
        body: html,
        status: 'sent'
      });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Erreur API Email:', error);
    return NextResponse.json(
      { error: "Erreur lors de l'envoi de l'email" },
      { status: 500 }
    );
  }
}
