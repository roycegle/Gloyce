-- ============================================================
-- Gloyce Schema V2 — run this in Supabase SQL editor
-- ============================================================

-- 1. Add service_type to form_templates (link template to service type)
ALTER TABLE form_templates ADD COLUMN IF NOT EXISTS service_type TEXT;

-- 2. Form fields table (questions inside each template)
CREATE TABLE IF NOT EXISTS form_fields (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  template_id UUID REFERENCES form_templates(id) ON DELETE CASCADE,
  label TEXT NOT NULL,
  field_type TEXT NOT NULL DEFAULT 'text',  -- text|textarea|select|date|number|email|phone|checkbox
  required BOOLEAN DEFAULT false,
  options JSONB,           -- array of strings for select fields
  placeholder TEXT,
  help_text TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Customer form responses (customer fills in their assigned forms)
ALTER TABLE customer_forms ADD COLUMN IF NOT EXISTS responses JSONB DEFAULT '{}';
ALTER TABLE customer_forms ADD COLUMN IF NOT EXISTS submitted_at TIMESTAMPTZ;

-- 4. Documents: add service linkage + storage path
ALTER TABLE documents ADD COLUMN IF NOT EXISTS service_id UUID REFERENCES services(id);
ALTER TABLE documents ADD COLUMN IF NOT EXISTS storage_path TEXT;

-- 5. Service types enum reference (informational)
-- Types: us_llc | singapore | hong_kong | us_bank | payment_gateway | accounting | odi | certification

-- 6. Seed predefined form templates for each service type
-- (Insert only if not already present, keyed by service_type)

INSERT INTO form_templates (name, description, category, service_type)
SELECT 'US LLC Formation — Information Form', 'Required information to form your US LLC', 'company', 'us_llc'
WHERE NOT EXISTS (SELECT 1 FROM form_templates WHERE service_type = 'us_llc');

INSERT INTO form_templates (name, description, category, service_type)
SELECT 'Singapore Company Formation — Information Form', 'Required information for ACRA registration', 'company', 'singapore'
WHERE NOT EXISTS (SELECT 1 FROM form_templates WHERE service_type = 'singapore');

INSERT INTO form_templates (name, description, category, service_type)
SELECT 'Hong Kong Company Formation — Information Form', 'Required information for CR registration', 'company', 'hong_kong'
WHERE NOT EXISTS (SELECT 1 FROM form_templates WHERE service_type = 'hong_kong');

INSERT INTO form_templates (name, description, category, service_type)
SELECT 'US Bank Account — Application Form', 'Business information for bank account opening', 'banking', 'us_bank'
WHERE NOT EXISTS (SELECT 1 FROM form_templates WHERE service_type = 'us_bank');

INSERT INTO form_templates (name, description, category, service_type)
SELECT 'ODI Registration — Information Form', 'Required information for Vietnam ODI registration', 'compliance', 'odi'
WHERE NOT EXISTS (SELECT 1 FROM form_templates WHERE service_type = 'odi');

INSERT INTO form_templates (name, description, category, service_type)
SELECT 'Document Certification Request', 'Details for apostille or government certification', 'compliance', 'certification'
WHERE NOT EXISTS (SELECT 1 FROM form_templates WHERE service_type = 'certification');

-- 7. Seed form fields for US LLC template
DO $$
DECLARE
  tmpl_id UUID;
BEGIN
  SELECT id INTO tmpl_id FROM form_templates WHERE service_type = 'us_llc' LIMIT 1;
  IF tmpl_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM form_fields WHERE template_id = tmpl_id) THEN
    INSERT INTO form_fields (template_id, label, field_type, required, placeholder, order_index) VALUES
      (tmpl_id, 'Desired Company Name', 'text', true, 'e.g. Acme Trading LLC', 1),
      (tmpl_id, 'Alternative Company Name (in case first is taken)', 'text', false, 'e.g. Acme Global LLC', 2),
      (tmpl_id, 'Business Purpose / Industry', 'textarea', true, 'Describe what your company will do', 3),
      (tmpl_id, 'Preferred State of Formation', 'select', true, NULL, 4),
      (tmpl_id, 'Number of Members / Owners', 'number', true, '1', 5),
      (tmpl_id, 'Full Legal Name of Member 1', 'text', true, 'As on passport', 6),
      (tmpl_id, 'Passport Number of Member 1', 'text', true, NULL, 7),
      (tmpl_id, 'Date of Birth of Member 1', 'date', true, NULL, 8),
      (tmpl_id, 'Home Address of Member 1', 'textarea', true, 'Full residential address', 9),
      (tmpl_id, 'Ownership % of Member 1', 'number', true, '100', 10),
      (tmpl_id, 'EIN Purpose (what will you use the EIN for?)', 'select', true, NULL, 11),
      (tmpl_id, 'Expected Annual Revenue (USD)', 'select', true, NULL, 12),
      (tmpl_id, 'Do you need a Registered Agent?', 'select', true, NULL, 13);

    -- Set options for select fields
    UPDATE form_fields SET options = '["Wyoming", "Delaware", "Florida", "Texas", "California", "Other"]'
      WHERE template_id = tmpl_id AND label LIKE 'Preferred State%';
    UPDATE form_fields SET options = '["Banking", "Receiving payments from clients", "Hiring employees", "Filing taxes", "All of the above"]'
      WHERE template_id = tmpl_id AND label LIKE 'EIN Purpose%';
    UPDATE form_fields SET options = '["Under $50,000", "$50,000 – $200,000", "$200,000 – $500,000", "Over $500,000"]'
      WHERE template_id = tmpl_id AND label LIKE 'Expected Annual%';
    UPDATE form_fields SET options = '["Yes — include in service package", "No — I already have one"]'
      WHERE template_id = tmpl_id AND label LIKE 'Do you need a Registered%';
  END IF;
END $$;

-- 8. Seed form fields for Singapore template
DO $$
DECLARE
  tmpl_id UUID;
BEGIN
  SELECT id INTO tmpl_id FROM form_templates WHERE service_type = 'singapore' LIMIT 1;
  IF tmpl_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM form_fields WHERE template_id = tmpl_id) THEN
    INSERT INTO form_fields (template_id, label, field_type, required, placeholder, order_index) VALUES
      (tmpl_id, 'Company Name (English)', 'text', true, 'e.g. Acme Pte. Ltd.', 1),
      (tmpl_id, 'Business Activity (SSIC Code description)', 'textarea', true, 'Describe the primary business activity', 2),
      (tmpl_id, 'Paid-up Capital (SGD)', 'number', true, '1', 3),
      (tmpl_id, 'Director Full Name', 'text', true, 'As on passport', 4),
      (tmpl_id, 'Director Passport Number', 'text', true, NULL, 5),
      (tmpl_id, 'Director Date of Birth', 'date', true, NULL, 6),
      (tmpl_id, 'Director Residential Address', 'textarea', true, 'Full address including country', 7),
      (tmpl_id, 'Director Email Address', 'email', true, NULL, 8),
      (tmpl_id, 'Shareholder Name (if different from director)', 'text', false, 'Leave blank if director is sole shareholder', 9),
      (tmpl_id, 'Number of Shares', 'number', true, '1000', 10),
      (tmpl_id, 'Do you need a Corporate Secretary?', 'select', true, NULL, 11);

    UPDATE form_fields SET options = '["Yes — include in package", "No — I will arrange separately"]'
      WHERE template_id = tmpl_id AND label LIKE 'Do you need a Corporate%';
  END IF;
END $$;

-- 9. Seed form fields for Hong Kong template
DO $$
DECLARE
  tmpl_id UUID;
BEGIN
  SELECT id INTO tmpl_id FROM form_templates WHERE service_type = 'hong_kong' LIMIT 1;
  IF tmpl_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM form_fields WHERE template_id = tmpl_id) THEN
    INSERT INTO form_fields (template_id, label, field_type, required, placeholder, order_index) VALUES
      (tmpl_id, 'Company Name (English)', 'text', true, 'e.g. Acme Limited', 1),
      (tmpl_id, 'Company Name (Chinese, optional)', 'text', false, NULL, 2),
      (tmpl_id, 'Nature of Business', 'textarea', true, 'Describe main business activities', 3),
      (tmpl_id, 'Authorized Share Capital (HKD)', 'number', true, '10000', 4),
      (tmpl_id, 'Director Full Name', 'text', true, 'As on passport/HKID', 5),
      (tmpl_id, 'Director ID / Passport Number', 'text', true, NULL, 6),
      (tmpl_id, 'Director Date of Birth', 'date', true, NULL, 7),
      (tmpl_id, 'Director Residential Address', 'textarea', true, NULL, 8),
      (tmpl_id, 'Director Email', 'email', true, NULL, 9),
      (tmpl_id, 'Shareholder Name', 'text', true, 'Can be same as director', 10),
      (tmpl_id, 'Number of Shares Held', 'number', true, '1', 11),
      (tmpl_id, 'Company Secretary needed?', 'select', true, NULL, 12),
      (tmpl_id, 'Registered Address needed?', 'select', true, NULL, 13);

    UPDATE form_fields SET options = '["Yes — include in package", "No"]'
      WHERE template_id = tmpl_id AND label LIKE 'Company Secretary%';
    UPDATE form_fields SET options = '["Yes — use Gloyce registered address", "No — I have my own"]'
      WHERE template_id = tmpl_id AND label LIKE 'Registered Address%';
  END IF;
END $$;

-- 10. Seed form fields for US Bank Account template
DO $$
DECLARE
  tmpl_id UUID;
BEGIN
  SELECT id INTO tmpl_id FROM form_templates WHERE service_type = 'us_bank' LIMIT 1;
  IF tmpl_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM form_fields WHERE template_id = tmpl_id) THEN
    INSERT INTO form_fields (template_id, label, field_type, required, placeholder, order_index) VALUES
      (tmpl_id, 'Business Legal Name (exactly as on LLC docs)', 'text', true, NULL, 1),
      (tmpl_id, 'EIN Number', 'text', true, 'XX-XXXXXXX', 2),
      (tmpl_id, 'Business Type / Industry', 'text', true, NULL, 3),
      (tmpl_id, 'Expected Monthly Revenue (USD)', 'select', true, NULL, 4),
      (tmpl_id, 'Expected Monthly Expenses (USD)', 'select', true, NULL, 5),
      (tmpl_id, 'Business Website (if any)', 'text', false, 'https://', 6),
      (tmpl_id, 'Countries you receive payments from', 'textarea', true, 'e.g. Vietnam, Singapore, US', 7),
      (tmpl_id, 'Countries you send payments to', 'textarea', false, NULL, 8),
      (tmpl_id, 'Primary Account Holder Full Name', 'text', true, NULL, 9),
      (tmpl_id, 'Social Security Number (SSN) or ITIN', 'text', false, 'Leave blank if not applicable', 10),
      (tmpl_id, 'Preferred Bank', 'select', true, NULL, 11);

    UPDATE form_fields SET options = '["Under $5,000", "$5,000 – $20,000", "$20,000 – $100,000", "Over $100,000"]'
      WHERE template_id = tmpl_id AND label LIKE 'Expected Monthly Revenue%';
    UPDATE form_fields SET options = '["Under $5,000", "$5,000 – $20,000", "$20,000 – $100,000", "Over $100,000"]'
      WHERE template_id = tmpl_id AND label LIKE 'Expected Monthly Expenses%';
    UPDATE form_fields SET options = '["Mercury (recommended for startups)", "Relay", "Chase Business", "Bank of America Business", "Let Gloyce decide"]'
      WHERE template_id = tmpl_id AND label LIKE 'Preferred Bank%';
  END IF;
END $$;

-- 11. Seed form fields for ODI template
DO $$
DECLARE
  tmpl_id UUID;
BEGIN
  SELECT id INTO tmpl_id FROM form_templates WHERE service_type = 'odi' LIMIT 1;
  IF tmpl_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM form_fields WHERE template_id = tmpl_id) THEN
    INSERT INTO form_fields (template_id, label, field_type, required, placeholder, order_index) VALUES
      (tmpl_id, 'Investor Full Name (as on CCCD/Passport)', 'text', true, NULL, 1),
      (tmpl_id, 'Investor ID Number (CCCD)', 'text', true, NULL, 2),
      (tmpl_id, 'Investor Date of Birth', 'date', true, NULL, 3),
      (tmpl_id, 'Investor Address in Vietnam', 'textarea', true, NULL, 4),
      (tmpl_id, 'Foreign Company Name', 'text', true, NULL, 5),
      (tmpl_id, 'Foreign Company Country', 'select', true, NULL, 6),
      (tmpl_id, 'Total Investment Amount (USD)', 'number', true, NULL, 7),
      (tmpl_id, 'Source of Capital', 'textarea', true, 'e.g. personal savings, business revenue', 8),
      (tmpl_id, 'Purpose of Overseas Investment', 'textarea', true, NULL, 9),
      (tmpl_id, 'Bank in Vietnam (for capital transfer account)', 'text', true, 'e.g. Vietcombank, Techcombank', 10),
      (tmpl_id, 'Existing Vietnamese business? (if capital from business)', 'select', false, NULL, 11);

    UPDATE form_fields SET options = '["United States", "Singapore", "Hong Kong", "Other"]'
      WHERE template_id = tmpl_id AND label LIKE 'Foreign Company Country%';
    UPDATE form_fields SET options = '["Yes — provide business license", "No — personal investment"]'
      WHERE template_id = tmpl_id AND label LIKE 'Existing Vietnamese%';
  END IF;
END $$;

-- 12. Seed form fields for Certification Request template
DO $$
DECLARE
  tmpl_id UUID;
BEGIN
  SELECT id INTO tmpl_id FROM form_templates WHERE service_type = 'certification' LIMIT 1;
  IF tmpl_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM form_fields WHERE template_id = tmpl_id) THEN
    INSERT INTO form_fields (template_id, label, field_type, required, placeholder, order_index) VALUES
      (tmpl_id, 'Document Name / Type', 'text', true, 'e.g. Articles of Organization, Certificate of Good Standing', 1),
      (tmpl_id, 'Certification Type Required', 'select', true, NULL, 2),
      (tmpl_id, 'Destination Country (where document will be used)', 'text', true, NULL, 3),
      (tmpl_id, 'Purpose of Certification', 'textarea', true, 'e.g. opening a bank account, government filing', 4),
      (tmpl_id, 'Number of Certified Copies Needed', 'number', true, '1', 5),
      (tmpl_id, 'Delivery Method', 'select', true, NULL, 6),
      (tmpl_id, 'Additional Notes', 'textarea', false, NULL, 7);

    UPDATE form_fields SET options = '["Apostille", "Notarization", "Embassy Legalization", "Certified True Copy", "Government Authentication"]'
      WHERE template_id = tmpl_id AND label LIKE 'Certification Type%';
    UPDATE form_fields SET options = '["Digital (PDF certified copy)", "Physical — courier to Vietnam", "Physical — pick up in US/SG/HK"]'
      WHERE template_id = tmpl_id AND label LIKE 'Delivery Method%';
  END IF;
END $$;

-- 13. Storage bucket setup (run via Supabase dashboard if needed)
-- Bucket name: "documents"
-- Policy: authenticated users can read their own files, service role can do everything

-- 14. Enable RLS on new tables
ALTER TABLE form_fields ENABLE ROW LEVEL SECURITY;

-- Admins can manage form fields (via service role)
CREATE POLICY "Service role manages form_fields" ON form_fields
  USING (true) WITH CHECK (true);

-- 15. Indexes for performance
CREATE INDEX IF NOT EXISTS idx_form_fields_template ON form_fields(template_id);
CREATE INDEX IF NOT EXISTS idx_customer_forms_user ON customer_forms(user_id);
CREATE INDEX IF NOT EXISTS idx_documents_service ON documents(service_id);
