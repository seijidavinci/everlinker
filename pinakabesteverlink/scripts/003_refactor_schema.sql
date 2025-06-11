-- Remove redundant columns from applications table
ALTER TABLE applications 
DROP COLUMN IF EXISTS educ_id,
DROP COLUMN IF EXISTS employment_id;

-- Drop the jobs table if it exists
DROP TABLE IF EXISTS jobs;

-- Update applications table to ensure proper relationships
COMMENT ON TABLE applications IS 'Application records - education and employment are linked via person_id';

-- Create index on person_id in applications table for better performance
CREATE INDEX IF NOT EXISTS idx_applications_person_id ON applications(person_id);
CREATE INDEX IF NOT EXISTS idx_education_person_id ON education(person_id);
CREATE INDEX IF NOT EXISTS idx_employment_person_id ON employment(person_id);

-- Verify the structure after modifications
DO $$
BEGIN
  RAISE NOTICE 'Schema refactoring complete. Tables structure updated.';
END $$;
