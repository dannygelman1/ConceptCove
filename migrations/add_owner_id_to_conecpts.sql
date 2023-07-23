ALTER TABLE concepts
ADD COLUMN owner_id uuid NOT NULL REFERENCES users (id),
