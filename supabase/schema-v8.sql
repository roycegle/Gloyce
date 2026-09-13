-- schema-v8: add price and payment_status to service_requests
-- Safe to run multiple times (idempotent)

ALTER TABLE service_requests ADD COLUMN IF NOT EXISTS price NUMERIC(10,2);
ALTER TABLE service_requests ADD COLUMN IF NOT EXISTS currency TEXT NOT NULL DEFAULT 'USD';
ALTER TABLE service_requests ADD COLUMN IF NOT EXISTS payment_status TEXT NOT NULL DEFAULT 'none';
-- payment_status values: none (not quoted yet), awaiting (price set, waiting payment), paid

-- Index for payment queries
CREATE INDEX IF NOT EXISTS service_requests_payment_status_idx ON service_requests(payment_status);
