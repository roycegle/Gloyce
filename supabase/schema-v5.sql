-- schema-v5: ensure service_requests has correct columns + RLS

-- Rename type -> service_type if old column still called "type"
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

-- Add service_type if neither column exists
ALTER TABLE service_requests ADD COLUMN IF NOT EXISTS service_type TEXT;

-- Ensure RLS policy allows service_role full access
ALTER TABLE service_requests ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Service role manages service_requests" ON service_requests;
CREATE POLICY "Service role manages service_requests" ON service_requests
  USING (true) WITH CHECK (true);
