-- ================================================================
-- RelancePro — Schéma Supabase complet
-- Copiez-collez ce fichier dans l'éditeur SQL de Supabase
-- ================================================================

-- Activer l'extension UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Optionnel : Supprimer les tables existantes si vous voulez repartir de zéro (Attention: supprime les données)
-- DROP TABLE IF EXISTS relance_sequences CASCADE;
-- DROP TABLE IF EXISTS relance_emails CASCADE;
-- DROP TABLE IF EXISTS invoices CASCADE;
-- DROP TABLE IF EXISTS profiles CASCADE;

-- ================================================================
-- TABLE: profiles
-- Extension de auth.users avec les données métier
-- ================================================================
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  company_name TEXT,
  siret TEXT,
  address TEXT,
  from_email TEXT, -- Email expéditeur personnalisé
  plan TEXT DEFAULT 'none' CHECK (plan IN ('none', 'trial', 'starter', 'pro', 'studio', 'cancelled')),
  trial_ends_at TIMESTAMPTZ DEFAULT NOW() + INTERVAL '14 days',
  stripe_customer_id TEXT UNIQUE,
  stripe_subscription_id TEXT UNIQUE,
  stripe_price_id TEXT,
  subscription_status TEXT DEFAULT 'incomplete',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ================================================================
-- TABLE: invoices
-- Factures à relancer
-- ================================================================
CREATE TABLE IF NOT EXISTS invoices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  invoice_number TEXT NOT NULL,
  client_name TEXT NOT NULL,
  client_email TEXT NOT NULL,
  amount DECIMAL(10, 2) NOT NULL CHECK (amount > 0),
  description TEXT,
  invoice_date DATE NOT NULL DEFAULT CURRENT_DATE,
  due_date DATE NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'overdue', 'paid', 'cancelled', 'paused')),
  relance_level INTEGER DEFAULT 0 CHECK (relance_level >= 0 AND relance_level <= 5),
  relance_paused BOOLEAN DEFAULT FALSE,
  next_relance_at TIMESTAMPTZ,
  paid_at TIMESTAMPTZ,
  amount_recovered DECIMAL(10, 2),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ================================================================
-- TABLE: relance_emails
-- Historique de tous les emails de relance envoyés
-- ================================================================
CREATE TABLE IF NOT EXISTS relance_emails (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  invoice_id UUID REFERENCES invoices(id) ON DELETE CASCADE NOT NULL,
  level INTEGER NOT NULL CHECK (level BETWEEN 1 AND 5),
  sent_at TIMESTAMPTZ DEFAULT NOW(),
  email_to TEXT NOT NULL,
  subject TEXT NOT NULL,
  body TEXT NOT NULL,
  status TEXT DEFAULT 'sent' CHECK (status IN ('sent', 'failed', 'bounced', 'opened'))
);

-- ================================================================
-- TABLE: relance_sequences
-- Configuration personnalisée des séquences de relance par user
-- ================================================================
CREATE TABLE IF NOT EXISTS relance_sequences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE UNIQUE NOT NULL,
  -- Délais en jours après échéance
  delay_level_1 INTEGER DEFAULT 3,
  delay_level_2 INTEGER DEFAULT 10,
  delay_level_3 INTEGER DEFAULT 20,
  delay_level_4 INTEGER DEFAULT 30,
  delay_level_5 INTEGER DEFAULT 38,
  -- Templates personnalisés (NULL = utilise le template par défaut)
  template_subject_1 TEXT,
  template_body_1 TEXT,
  template_subject_2 TEXT,
  template_body_2 TEXT,
  template_subject_3 TEXT,
  template_body_3 TEXT,
  template_subject_4 TEXT,
  template_body_4 TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ================================================================
-- ROW LEVEL SECURITY
-- ================================================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE relance_emails ENABLE ROW LEVEL SECURITY;
ALTER TABLE relance_sequences ENABLE ROW LEVEL SECURITY;

-- Profiles
DROP POLICY IF EXISTS "profiles_select_own" ON profiles;
CREATE POLICY "profiles_select_own" ON profiles FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "profiles_insert_own" ON profiles;
CREATE POLICY "profiles_insert_own" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "profiles_update_own" ON profiles;
CREATE POLICY "profiles_update_own" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Invoices
DROP POLICY IF EXISTS "invoices_all_own" ON invoices;
CREATE POLICY "invoices_all_own" ON invoices FOR ALL USING (auth.uid() = user_id);

-- Relance emails (lecture seule pour l'utilisateur)
DROP POLICY IF EXISTS "relance_emails_select" ON relance_emails;
CREATE POLICY "relance_emails_select" ON relance_emails
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM invoices
      WHERE invoices.id = relance_emails.invoice_id
        AND invoices.user_id = auth.uid()
    )
  );

-- Sequences
DROP POLICY IF EXISTS "sequences_all_own" ON relance_sequences;
CREATE POLICY "sequences_all_own" ON relance_sequences FOR ALL USING (auth.uid() = user_id);

-- ================================================================
-- FONCTIONS & TRIGGERS
-- ================================================================

-- Auto-créer le profil à l'inscription
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Mettre à jour le champ updated_at automatiquement
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS invoices_updated_at ON invoices;
CREATE TRIGGER invoices_updated_at BEFORE UPDATE ON invoices
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at();

DROP TRIGGER IF EXISTS profiles_updated_at ON profiles;
CREATE TRIGGER profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at();

-- Passer automatiquement les factures "pending" dépassées en "overdue"
CREATE OR REPLACE FUNCTION update_overdue_invoices()
RETURNS void AS $$
  UPDATE invoices
  SET status = 'overdue', updated_at = NOW()
  WHERE status = 'pending'
    AND due_date < CURRENT_DATE
    AND relance_paused = FALSE;
$$ LANGUAGE sql SECURITY DEFINER;

-- ================================================================
-- INDEX pour les performances
-- ================================================================
CREATE INDEX IF NOT EXISTS idx_invoices_user_id ON invoices(user_id);
CREATE INDEX IF NOT EXISTS idx_invoices_status ON invoices(status);
CREATE INDEX IF NOT EXISTS idx_invoices_due_date ON invoices(due_date);
CREATE INDEX IF NOT EXISTS idx_invoices_next_relance ON invoices(next_relance_at);
CREATE INDEX IF NOT EXISTS idx_relance_emails_invoice ON relance_emails(invoice_id);
