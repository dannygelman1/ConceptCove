ALTER TABLE users
DROP COLUMN firebase_id;

ALTER TABLE users
ADD COLUMN firebase_id text UNIQUE;
