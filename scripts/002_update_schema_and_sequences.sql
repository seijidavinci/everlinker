-- Create a table to manage sequential IDs
CREATE TABLE IF NOT EXISTS sequences (
  name TEXT PRIMARY KEY,
  last_value INT NOT NULL
);

-- Insert initial values for application ID sequence if not exists
INSERT INTO sequences (name, last_value)
VALUES ('application_id_seq', 1233) -- Start from 1233 so the first generated ID is 1234
ON CONFLICT (name) DO NOTHING;

-- Function to get the next sequential ID suffix
CREATE OR REPLACE FUNCTION get_next_id_suffix(seq_name TEXT)
RETURNS INT AS $$
DECLARE
    next_val INT;
BEGIN
    UPDATE sequences
    SET last_value = last_value + 1
    WHERE name = seq_name
    RETURNING last_value INTO next_val;
    RETURN next_val;
END;
$$ LANGUAGE plpgsql;

-- Add new columns to personal_profiles
ALTER TABLE personal_profiles
ADD COLUMN email TEXT NOT NULL DEFAULT 'default@example.com', -- Add email, make it NOT NULL
ADD COLUMN is_pwd BOOLEAN DEFAULT FALSE, -- Add PWD status
ADD COLUMN indigenous_group TEXT; -- Add indigenous group

-- Update civil_status enum to include 'Divorced' if not already present
-- This requires dropping and recreating the type or adding a new value if it's an enum type.
-- Assuming it's a TEXT column with CHECK constraint, we just need to ensure the form handles it.
-- If it was a PostgreSQL ENUM type, you'd do:
-- ALTER TYPE civil_status ADD VALUE 'Divorced' AFTER 'Married';
-- For now, assuming it's a TEXT column with a check constraint, the form will handle the value.

-- Create jobs table
CREATE TABLE IF NOT EXISTS jobs (
  job_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  department TEXT NOT NULL,
  location TEXT NOT NULL,
  type TEXT NOT NULL,
  salary TEXT NOT NULL,
  description TEXT NOT NULL,
  responsibilities TEXT[], -- Array of text for responsibilities
  requirements TEXT[],    -- Array of text for requirements
  benefits TEXT[],        -- Array of text for benefits
  is_active BOOLEAN DEFAULT TRUE, -- Toggle job visibility
  posted_date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add RLS policies for jobs table
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;

-- Policy for public users to view active jobs
CREATE POLICY "Public can view active jobs"
ON jobs FOR SELECT
USING (is_active = TRUE);

-- Policy for authenticated users (admins) to manage jobs
-- You might want to refine this to a specific 'admin' role later
CREATE POLICY "Admins can manage jobs"
ON jobs FOR ALL
USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

-- Add RLS policies for applications and related tables for owner updates
-- This assumes a user can only update their own application based on person_id
-- For the requested "Application ID and Surname" update, we'll handle that in the server action
-- as RLS typically uses auth.uid() or similar for session-based access.

-- Policy for personal_profiles: users can update their own profile
CREATE POLICY "Users can update their own personal profile"
ON personal_profiles FOR UPDATE
USING (person_id = (SELECT person_id FROM applications WHERE app_id = current_setting('app.current_app_id')::uuid));

-- Policy for education: users can update their own education records
CREATE POLICY "Users can update their own education records"
ON education FOR UPDATE
USING (person_id = (SELECT person_id FROM applications WHERE app_id = current_setting('app.current_app_id')::uuid));

-- Policy for employment: users can update their own employment records
CREATE POLICY "Users can update their own employment records"
ON employment FOR UPDATE
USING (person_id = (SELECT person_id FROM applications WHERE app_id = current_setting('app.current_app_id')::uuid));

-- Policy for character_references: users can update their own character references
CREATE POLICY "Users can update their own character references"
ON character_references FOR UPDATE
USING (character_reference_id = (SELECT character_reference_id FROM employment WHERE person_id = (SELECT person_id FROM applications WHERE app_id = current_setting('app.current_app_id')::uuid)));

-- Policy for applications: users can update their own application status (if allowed) or details
CREATE POLICY "Users can update their own application"
ON applications FOR UPDATE
USING (app_id = current_setting('app.current_app_id')::uuid);

-- Set a default for email to avoid issues with existing data if any
ALTER TABLE personal_profiles ALTER COLUMN email SET DEFAULT 'default@example.com';
