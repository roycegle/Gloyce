-- Schema v9: Form review workflow
-- customer_forms status values:
--   pending       → assigned, customer not started
--   draft         → customer saving draft
--   submitted     → customer submitted, awaiting admin review
--   approved      → admin approved, ready to submit to government
--   gov_submitted → submitted to government, awaiting decision
--   needs_update  → admin/gov requests customer to add/fix info
--   completed     → government approved, done

ALTER TABLE customer_forms
  ADD COLUMN IF NOT EXISTS admin_review_notes TEXT,
  ADD COLUMN IF NOT EXISTS gov_submission_notes TEXT,
  ADD COLUMN IF NOT EXISTS reviewed_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS gov_submitted_at TIMESTAMPTZ;

CREATE INDEX IF NOT EXISTS customer_forms_status_idx ON customer_forms(status);
