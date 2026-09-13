-- schema-v7: ensure service_requests table is fully correct for production
-- Safe to run multiple times (idempotent)

-- 1. Create table if it doesn't exist yet
CREATE TABLE IF NOT EXISTS service_requests (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  service_type TEXT NOT NULL DEFAULT 'document_request',
  status      TEXT NOT NULL DEFAULT 'pending',
  details     JSONB NOT NULL DEFAULT '{}',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. If old column was named "type", rename to "service_type"
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'service_requests' AND column_name = 'type'
  ) AND NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'service_requests' AND column_name = 'service_type'
  ) THEN
    ALTER TABLE service_requests RENAME COLUMN type TO service_type;
  END IF;
END $$;

-- 3. Add service_type column if somehow still missing
ALTER TABLE service_requests ADD COLUMN IF NOT EXISTS service_type TEXT NOT NULL DEFAULT 'document_request';

-- 4. Add status column if missing
ALTER TABLE service_requests ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'pending';

-- 5. Add details column if missing
ALTER TABLE service_requests ADD COLUMN IF NOT EXISTS details JSONB NOT NULL DEFAULT '{}';

-- 6. Enable RLS
ALTER TABLE service_requests ENABLE ROW LEVEL SECURITY;

-- 7. service_role can do everything (used by supabaseAdmin in API routes)
--    Note: service_role bypasses RLS automatically — this policy is a safety net
DROP POLICY IF EXISTS "service_role_all" ON service_requests;
CREATE POLICY "service_role_all" ON service_requests
  TO service_role
  USING (true)
  WITH CHECK (true);

-- 8. Authenticated users can only read/insert their own rows
DROP POLICY IF EXISTS "users_own_rows" ON service_requests;
CREATE POLICY "users_own_rows" ON service_requests
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- 9. Create index on user_id for performance
CREATE INDEX IF NOT EXISTS service_requests_user_id_idx ON service_requests(user_id);
CREATE INDEX IF NOT EXISTS service_requests_status_idx ON service_requests(status);
CREATE INDEX IF NOT EXISTS service_requests_service_type_idx ON service_requests(service_type);
