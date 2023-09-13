-- Create the "ingredients" table
CREATE TABLE ingredients (
  id BIGSERIAL PRIMARY KEY,
  ingredient_name TEXT NOT NULL,
  benefit TEXT,
  risks TEXT,
  easily_grown BOOLEAN DEFAULT false,
  user_id UUID NOT NULL
);

-- Enable row-level security for the "ingredients" table
ALTER TABLE ingredients ENABLE ROW LEVEL SECURITY;

-- Create policies for the "ingredients" table
CREATE POLICY "Individuals can create ingredients." ON ingredients
  FOR INSERT
  WITH CHECK (TRUE);

CREATE POLICY "Individuals can view their own ingredients." ON ingredients
  FOR SELECT
  USING (auth.uid() = user_id);

-- Allow individuals to view all ingredients
CREATE POLICY "Individuals can view all ingredients." ON ingredients
  FOR SELECT
  USING (TRUE);

CREATE POLICY "Individuals can update their own ingredients." ON ingredients
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Individuals can delete their own ingredients." ON ingredients
  FOR DELETE
  USING (auth.uid() = user_id);