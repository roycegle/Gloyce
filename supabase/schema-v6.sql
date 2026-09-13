-- schema-v6: make service_id nullable in service_requests (was NOT NULL)
ALTER TABLE service_requests ALTER COLUMN service_id DROP NOT NULL;
