import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { createClient } from '@supabase/supabase-js';
import Stripe from 'stripe';

// On utilise le service_role_key pour contourner le RLS (Row Level Security)
// car ce webhook est déclenché par Stripe (pas de session utilisateur)
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
  const payload = await request.text();
  const signature = request.headers.get('stripe-signature') as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      payload,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: any) {
    console.error('Erreur de signature Webhook Stripe:', error.message);
    return NextResponse.json({ error: 'Signature invalide' }, { status: 400 });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.metadata?.userId;

        if (userId) {
          // Si on utilise Stripe Customer Portal, on veut enregistrer le customer_id
          await supabaseAdmin
            .from('profiles')
            .update({
              stripe_customer_id: session.customer as string,
            })
            .eq('id', userId);
        }
        break;
      }

      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;
        const status = subscription.status;
        const priceId = subscription.items.data[0].price.id;

        // Déterminer le nom du plan à partir du priceId
        let plan = 'starter';
        if (priceId === process.env.STRIPE_PRICE_PRO) plan = 'pro';
        if (priceId === process.env.STRIPE_PRICE_STUDIO) plan = 'studio';

        await supabaseAdmin
          .from('profiles')
          .update({
            stripe_subscription_id: subscription.id,
            stripe_price_id: priceId,
            subscription_status: status,
            plan: status === 'active' || status === 'trialing' ? plan : 'cancelled',
          })
          .eq('stripe_customer_id', customerId);
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;

        await supabaseAdmin
          .from('profiles')
          .update({
            stripe_subscription_id: null,
            stripe_price_id: null,
            subscription_status: 'canceled',
            plan: 'cancelled',
          })
          .eq('stripe_customer_id', customerId);
        break;
      }

      default:
        console.log(`Événement non géré: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Erreur de traitement Webhook:', error);
    return NextResponse.json(
      { error: 'Erreur lors du traitement du Webhook' },
      { status: 500 }
    );
  }
}
