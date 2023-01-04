
DROP TABLE IF EXISTS favourite_items CASCADE;
CREATE TABLE favourite_items (
  id SERIAL PRIMARY KEY NOT NULL,
  cards_id INTEGER references items(id) on delete CASCADE,
  users_id INTEGER references users(id) on delete CASCADE,
);
