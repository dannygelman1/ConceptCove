CREATE TABLE images (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text,
  extension text,
  created_at timestamptz NOT NULL DEFAULT NOW(),
  updated_at timestamptz NOT NULL DEFAULT NOW()
);
