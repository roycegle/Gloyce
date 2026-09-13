-- ============================================================
-- Gloyce Schema V3 — Onboarding tokens for purchase flow
-- Run in Supabase SQL editor
-- ============================================================

CREATE TABLE IF NOT EXISTS onboarding_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  token TEXT UNIQUE NOT NULL DEFAULT encode(gen_random_bytes(32), 'hex'),
  expires_at TIMESTAMPTZ NOT NULL DEFAULT NOW() + INTERVAL '48 hours',
  used BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_onboarding_tokens_token ON onboarding_tokens(token);
CREATE INDEX IF NOT EXISTS idx_onboarding_tokens_user ON onboarding_tokens(user_id);

ALTER TABLE onboarding_tokens ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Service role manages onboarding_tokens" ON onboarding_tokens USING (true) WITH CHECK (true);
