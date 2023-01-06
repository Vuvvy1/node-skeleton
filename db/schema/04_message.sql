
DROP TABLE IF EXISTS message CASCADE;
CREATE TABLE message (
  id SERIAL PRIMARY KEY NOT NULL,
  users_id INTEGER references users(id) on delete CASCADE,
  messages VARCHAR(255) NOT NULL
);
