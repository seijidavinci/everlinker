-- Add disclosure fields to personal_profiles table
ALTER TABLE personal_profiles 
ADD COLUMN IF NOT EXISTS is_pwd BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS disability_details TEXT,
ADD COLUMN IF NOT EXISTS is_indigenous BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS indigenous_details TEXT;

-- Add comments to document the purpose of these fields
COMMENT ON COLUMN personal_profiles.is_pwd IS 'Optional disclosure: Person with Disability status';
COMMENT ON COLUMN personal_profiles.disability_details IS 'Optional: Details about disabilities for accommodation purposes';
COMMENT ON COLUMN personal_profiles.is_indigenous IS 'Optional disclosure: Indigenous People community membership';
COMMENT ON COLUMN personal_profiles.indigenous_details IS 'Optional: Specific indigenous community or tribe information';

-- Create index for reporting purposes (optional)
CREATE INDEX IF NOT EXISTS idx_personal_profiles_disclosure 
ON personal_profiles(is_pwd, is_indigenous) 
WHERE is_pwd = TRUE OR is_indigenous = TRUE;
