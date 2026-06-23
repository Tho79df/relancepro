import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { createClient } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const { priceId, plan } = await request.json();

    let finalPriceId = priceId;
    if (plan === 'starter') finalPriceId = process.env.STRIPE_PRICE_STARTER;
    if (plan === 'pro') finalPriceId = process.env.STRIPE_PRICE_PRO;
    if (plan === 'studio') finalPriceId = process.env.STRIPE_PRICE_STUDIO;

    if (!finalPriceId) {
      return NextResponse.json({ error: 'Price ID ou Plan manquant' }, { status: 400 });
    }

    const supabase = await createClient();
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      customer_email: user.email,
      line_items: [{ price: finalPriceId, quantity: 1 }],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/paywall?canceled=true`,
      metadata: {
        userId: user.id,
      },
      subscription_data: {
        trial_period_days: 14,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Erreur Stripe Checkout:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la création de la session de paiement' },
      { status: 500 }
    );
  }
}
