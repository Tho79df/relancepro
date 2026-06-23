import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase';
import { sendRelanceEmail } from '@/lib/resend';

const DEFAULT_TEMPLATES = [
  {
    level: 1,
    subject: 'Facture arrivée à échéance',
    body: 'Bonjour,\n\nSauf erreur ou omission de notre part, le paiement de la facture {{invoice_number}} d\'un montant de {{amount}}€, arrivée à échéance le {{due_date}}, ne nous est pas parvenu.\n\nNous vous saurions gré de bien vouloir procéder à son règlement dans les meilleurs délais.\n\nCordialement,'
  },
  {
    level: 2,
    subject: 'Relance : Facture impayée',
    body: 'Bonjour,\n\nNous faisons suite à notre précédent message concernant la facture {{invoice_number}} de {{amount}}€, échue le {{due_date}}.\n\nÀ ce jour, nous n\'avons toujours pas reçu le paiement. Nous vous invitons à régulariser la situation au plus vite.\n\nCordialement,'
  },
  {
    level: 3,
    subject: 'Dernière relance avant mise en demeure',
    body: 'Madame, Monsieur,\n\nMalgré nos précédentes relances, la facture {{invoice_number}} reste impayée à ce jour.\n\nNous vous demandons de bien vouloir procéder au règlement de la somme de {{amount}}€ immédiatement. À défaut de paiement rapide, nous serons contraints de transmettre ce dossier à notre service de recouvrement.\n\nSalutations,'
  },
  {
    level: 4,
    subject: 'MISE EN DEMEURE DE PAYER',
    body: 'Madame, Monsieur,\n\nPar la présente, nous vous mettons en demeure de payer la somme de {{amount}}€ correspondant à la facture {{invoice_number}}, dont l\'échéance était fixée au {{due_date}}.\n\nÀ défaut de règlement sous 48 heures, nous engagerons les poursuites judiciaires nécessaires pour recouvrer notre créance, avec application des pénalités de retard légales.\n\nSalutations distinguées,'
  }
];

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }

    const { invoice_id, level } = await request.json();

    if (!invoice_id || !level || level < 1 || level > 5) {
      return NextResponse.json({ error: 'Paramètres invalides' }, { status: 400 });
    }

    // 1. Récupérer la facture
    const { data: invoice, error: invoiceError } = await supabase
      .from('invoices')
      .select('*')
      .eq('id', invoice_id)
      .eq('user_id', user.id)
      .single();

    if (invoiceError || !invoice) {
      return NextResponse.json({ error: 'Facture introuvable' }, { status: 404 });
    }

    // 2. Récupérer la configuration de l'utilisateur
    const { data: sequence } = await supabase
      .from('relance_sequences')
      .select('*')
      .eq('user_id', user.id)
      .single();

    // 3. Déterminer le sujet et le corps
    let rawSubject = '';
    let rawBody = '';

    if (sequence && sequence[`template_subject_${level}`]) {
      rawSubject = sequence[`template_subject_${level}`];
      rawBody = sequence[`template_body_${level}`] || '';
    } else {
      const defaultTpl = DEFAULT_TEMPLATES.find(t => t.level === level) || DEFAULT_TEMPLATES[0];
      rawSubject = defaultTpl.subject;
      rawBody = defaultTpl.body;
    }

    // 4. Remplacer les variables
    const formattedDate = new Date(invoice.due_date).toLocaleDateString('fr-FR');
    const amountStr = invoice.amount.toLocaleString('fr-FR');
    
    const subject = rawSubject
      .replace(/{{invoice_number}}/g, invoice.invoice_number)
      .replace(/{{amount}}/g, amountStr)
      .replace(/{{due_date}}/g, formattedDate);

    let body = rawBody
      .replace(/{{invoice_number}}/g, invoice.invoice_number)
      .replace(/{{amount}}/g, amountStr)
      .replace(/{{due_date}}/g, formattedDate);
      
    // Convertir les retours à la ligne en balises HTML <br/> pour l'email
    const htmlBody = body.replace(/\n/g, '<br/>');

    // 5. Envoyer l'email via Resend
    const result = await sendRelanceEmail({
      to: invoice.client_email,
      subject: subject,
      html: `<div style="font-family: sans-serif; color: #333; line-height: 1.6;">${htmlBody}</div>`,
    });

    if (!result.success) {
      return NextResponse.json({ error: 'Erreur lors de l\'envoi de l\'email' }, { status: 500 });
    }

    // 6. Mettre à jour la base de données
    await supabase.from('invoices').update({
      relance_level: level,
      status: 'overdue', // S'assurer que le statut est bien 'overdue' après une relance
    }).eq('id', invoice.id);

    await supabase.from('relance_emails').insert({
      invoice_id: invoice.id,
      level: level,
      email_to: invoice.client_email,
      subject: subject,
      body: body,
      status: 'sent'
    });

    return NextResponse.json({ success: true, message: `Relance de niveau ${level} envoyée.` });

  } catch (error: any) {
    console.error('API /relances/send error:', error);
    return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
  }
}
