

DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  item_id INTEGER references items(id) on delete CASCADE,
  users_id INTEGER references users(id) on delete CASCADE,
);
