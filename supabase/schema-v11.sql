-- Schema v11: Add company_name to services
-- Admin fills this with the real registered company name (e.g. "BenLee Ltd")
-- distinct from the service template name (e.g. "Singapore Company Formation")
ALTER TABLE services ADD COLUMN IF NOT EXISTS company_name TEXT;
