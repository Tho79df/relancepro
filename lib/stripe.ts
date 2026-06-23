import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-05-27.dahlia',
});

export const PLANS = {
  starter: {
    name: 'Starter',
    price: 9,
    priceId: process.env.STRIPE_PRICE_STARTER!,
    features: ['5 factures actives', '3 niveaux de relance', 'Email uniquement'],
  },
  pro: {
    name: 'Pro',
    price: 19,
    priceId: process.env.STRIPE_PRICE_PRO!,
    features: ['Factures illimitées', '5 niveaux de relance', 'Mise en demeure PDF', 'Import CSV'],
  },
  studio: {
    name: 'Studio',
    price: 39,
    priceId: process.env.STRIPE_PRICE_STUDIO!,
    features: ['Tout Pro', 'Multi-clients', 'API access', 'Onboarding dédié'],
  },
};

export async function createCheckoutSession(priceId: string, userId: string, userEmail: string) {
  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    customer_email: userEmail,
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/parametres`,
    metadata: { userId },
    trial_period_days: 14,
  });
  return session;
}

export async function createPortalSession(customerId: string) {
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/parametres`,
  });
  return session;
}
