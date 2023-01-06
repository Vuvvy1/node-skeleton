
DROP TABLE IF EXISTS message CASCADE;
CREATE TABLE message (
  id SERIAL PRIMARY KEY NOT NULL,
  -- admin_id INTEGER references users(id) on delete CASCADE,
  
  users_id INTEGER references users(id) on delete CASCADE,
  cards_id INTEGER references cards(id) on delete CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  message VARCHAR(255) NOT NULL
);
