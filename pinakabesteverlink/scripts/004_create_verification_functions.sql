-- Function to check if a table exists
CREATE OR REPLACE FUNCTION check_if_table_exists(table_name TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_name = check_if_table_exists.table_name
  );
END;
$$ LANGUAGE plpgsql;

-- Function to check table structure
CREATE OR REPLACE FUNCTION check_table_structure(table_name TEXT)
RETURNS JSONB AS $$
DECLARE
  result JSONB;
BEGIN
  SELECT jsonb_agg(jsonb_build_object(
    'column_name', column_name,
    'data_type', data_type,
    'is_nullable', is_nullable
  ))
  INTO result
  FROM information_schema.columns
  WHERE table_schema = 'public' 
  AND table_name = check_table_structure.table_name;
  
  RETURN result;
END;
$$ LANGUAGE plpgsql;

-- Function to check foreign keys
CREATE OR REPLACE FUNCTION check_foreign_keys(schema_name TEXT)
RETURNS JSONB AS $$
DECLARE
  result JSONB;
BEGIN
  SELECT jsonb_agg(jsonb_build_object(
    'constraint_name', tc.constraint_name,
    'table', tc.table_name,
    'column', kcu.column_name,
    'foreign_table', ccu.table_name,
    'foreign_column', ccu.column_name
  ))
  INTO result
  FROM information_schema.table_constraints AS tc 
  JOIN information_schema.key_column_usage AS kcu
    ON tc.constraint_name = kcu.constraint_name
    AND tc.table_schema = kcu.table_schema
  JOIN information_schema.constraint_column_usage AS ccu
    ON ccu.constraint_name = tc.constraint_name
    AND ccu.table_schema = tc.table_schema
  WHERE tc.constraint_type = 'FOREIGN KEY'
  AND tc.table_schema = check_foreign_keys.schema_name;
  
  RETURN result;
END;
$$ LANGUAGE plpgsql;
