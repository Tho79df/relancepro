import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase-client';

export type PlanName = 'starter' | 'pro' | 'studio' | 'none';

export interface PlanLimits {
  plan: PlanName;
  maxInvoices: number;       // -1 = unlimited
  maxRelanceLevels: number;  // 3 or 4
  hasPdfMise: boolean;       // Mise en demeure PDF
  hasImportCsv: boolean;
  subscriptionStatus: string;
  isAdmin: boolean;
}

const PLAN_LIMITS: Record<PlanName, Omit<PlanLimits, 'subscriptionStatus' | 'isAdmin' | 'plan'>> = {
  none: {
    maxInvoices: 0,
    maxRelanceLevels: 0,
    hasPdfMise: false,
    hasImportCsv: false,
  },
  starter: {
    maxInvoices: 5,
    maxRelanceLevels: 3,
    hasPdfMise: false,
    hasImportCsv: false,
  },
  pro: {
    maxInvoices: -1,
    maxRelanceLevels: 4,
    hasPdfMise: true,
    hasImportCsv: true,
  },
  studio: {
    maxInvoices: -1,
    maxRelanceLevels: 4,
    hasPdfMise: true,
    hasImportCsv: true,
  },
};

function detectPlanFromPriceId(priceId: string | null): PlanName {
  if (!priceId) return 'none';
  const starterPriceId = process.env.NEXT_PUBLIC_STRIPE_PRICE_STARTER;
  const studioPriceId = process.env.NEXT_PUBLIC_STRIPE_PRICE_STUDIO;
  if (priceId === starterPriceId) return 'starter';
  if (priceId === studioPriceId) return 'studio';
  // Default to pro for any other recognized price ID
  return 'pro';
}

export function usePlan(): PlanLimits & { loading: boolean } {
  const [limits, setLimits] = useState<PlanLimits>({
    plan: 'none',
    maxInvoices: 0,
    maxRelanceLevels: 0,
    hasPdfMise: false,
    hasImportCsv: false,
    subscriptionStatus: 'none',
    isAdmin: false,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPlan() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { setLoading(false); return; }

      const isAdmin = user.email === 'lootthomas2@gmail.com';

      const { data: profile } = await supabase
        .from('profiles')
        .select('subscription_status, stripe_price_id')
        .eq('id', user.id)
        .single();

      const status = profile?.subscription_status || 'none';
      const hasAccess = isAdmin || status === 'active' || status === 'trialing';

      let plan: PlanName = 'none';
      if (isAdmin) {
        plan = 'studio'; // Admin gets full access
      } else if (hasAccess) {
        plan = detectPlanFromPriceId(profile?.stripe_price_id || null);
      }

      setLimits({
        plan,
        ...PLAN_LIMITS[plan],
        subscriptionStatus: isAdmin ? 'active' : status,
        isAdmin,
      });
      setLoading(false);
    }
    loadPlan();
  }, []);

  return { ...limits, loading };
}
