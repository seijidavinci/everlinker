-- Enable the uuid-ossp extension for generating UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create personal_profiles table
CREATE TABLE personal_profiles (
  person_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  applicant_id UUID NOT NULL UNIQUE, -- Used for tracking specific applications
  name TEXT NOT NULL,
  sex TEXT NOT NULL CHECK (sex IN ('Male', 'Female', 'Other')),
  city_address TEXT NOT NULL,
  residential_address TEXT NOT NULL,
  birth_date DATE NOT NULL,
  birth_place TEXT NOT NULL,
  civil_status TEXT NOT NULL CHECK (civil_status IN ('Single', 'Married', 'Widowed', 'Other')),
  citizenship TEXT NOT NULL,
  height NUMERIC NOT NULL,
  weight NUMERIC NOT NULL,
  religion TEXT,
  cellphone_number TEXT NOT NULL,
  father_name TEXT NOT NULL,
  mother_name TEXT NOT NULL,
  emergency_contact_name TEXT,
  emergency_contact_number TEXT,
  languages TEXT[], -- Array of text for languages
  skills TEXT[],    -- Array of text for skills
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create education table
CREATE TABLE education (
  educ_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  person_id UUID NOT NULL REFERENCES personal_profiles(person_id) ON DELETE CASCADE,
  education_level TEXT NOT NULL,
  school TEXT NOT NULL,
  year_graduated DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create character_references table
CREATE TABLE character_references (
  character_reference_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  reference_name TEXT NOT NULL,
  reference_occupation TEXT NOT NULL,
  reference_company TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create employment table
CREATE TABLE employment (
  employment_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  person_id UUID NOT NULL REFERENCES personal_profiles(person_id) ON DELETE CASCADE,
  character_reference_id UUID REFERENCES character_references(character_reference_id) ON DELETE SET NULL,
  position TEXT NOT NULL,
  company TEXT NOT NULL,
  occupation_start DATE NOT NULL,
  occupation_end DATE, -- Nullable for current employment
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create applications table
CREATE TABLE applications (
  app_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  person_id UUID NOT NULL REFERENCES personal_profiles(person_id) ON DELETE CASCADE,
  -- Note: educ_id and employment_id are linked to the first entry in the respective arrays
  -- as per the current application logic. Consider if a many-to-many relationship is needed.
  educ_id UUID REFERENCES education(educ_id) ON DELETE SET NULL,
  employment_id UUID REFERENCES employment(employment_id) ON DELETE SET NULL,
  submission_date DATE NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('Submitted', 'Under Review', 'Awaiting Evaluation', 'Shortlisted', 'Interview Scheduled', 'Rejected', 'Offer', 'Withdrawn')),
  resume_url TEXT,
  cover_letter_url TEXT,
  supporting_materials_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
