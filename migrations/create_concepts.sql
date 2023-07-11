CREATE TABLE concepts (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  image_id uuid,
  title text,
  artist text,
  url text,
  created_at timestamptz NOT NULL DEFAULT NOW(),
  updated_at timestamptz NOT NULL DEFAULT NOW()
);
