import { Resend } from 'resend';

// Initialise Resend avec la clé API
// Note: Si RESEND_API_KEY est manquant (ex: en dev sans compte), on loggera simplement
export const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

// L'email d'envoi. En dev sans nom de domaine, onboarding@resend.dev enverra uniquement
// vers l'email associé au compte Resend.
export const FROM_EMAIL = process.env.FROM_EMAIL || 'onboarding@resend.dev';

export async function sendRelanceEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  if (!resend) {
    console.log('--- EMAIL MOCK (Resend non configuré) ---');
    console.log(`To: ${to}`);
    console.log(`Subject: ${subject}`);
    console.log(`Content: ${html}`);
    console.log('-------------------------------------------');
    return { success: true, mocked: true };
  }

  try {
    const data = await resend.emails.send({
      from: FROM_EMAIL,
      to: [to],
      subject: subject,
      html: html,
    });
    return { success: true, data };
  } catch (error) {
    console.error("Erreur d'envoi d'email:", error);
    return { success: false, error };
  }
}
