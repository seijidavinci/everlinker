-- Fix the civil status constraint to match the form options
ALTER TABLE personal_profiles 
DROP CONSTRAINT IF EXISTS personal_profiles_civil_status_check;

-- Add the corrected constraint that matches the form options
ALTER TABLE personal_profiles 
ADD CONSTRAINT personal_profiles_civil_status_check 
CHECK (civil_status IN ('Single', 'Married', 'Widowed', 'Other'));

-- Also ensure sex constraint is correct
ALTER TABLE personal_profiles 
DROP CONSTRAINT IF EXISTS personal_profiles_sex_check;

ALTER TABLE personal_profiles 
ADD CONSTRAINT personal_profiles_sex_check 
CHECK (sex IN ('Male', 'Female', 'Other'));

-- Verify the constraints
SELECT 
    conname as constraint_name,
    consrc as constraint_definition
FROM pg_constraint 
WHERE conrelid = 'personal_profiles'::regclass 
AND contype = 'c';
