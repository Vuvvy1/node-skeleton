
DROP TABLE IF EXISTS message CASCADE;
CREATE TABLE message (
  id SERIAL PRIMARY KEY NOT NULL,
  admin_id INTEGER references admin(id) on delete CASCADE,
  users_id INTEGER references users(id) on delete CASCADE,
  messages VARCHAR(255) NOT NULL
);
