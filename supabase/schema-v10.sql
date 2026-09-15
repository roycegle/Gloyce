-- Schema v10: Link invoices to service_requests for ad-hoc pricing workflow
ALTER TABLE invoices
  ADD COLUMN IF NOT EXISTS service_request_id UUID REFERENCES service_requests(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS invoices_service_request_id_idx ON invoices(service_request_id);
