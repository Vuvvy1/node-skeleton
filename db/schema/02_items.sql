
DROP TABLE IF EXISTS items CASCADE;
CREATE TABLE items (
  id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  cost DECIMAL(10,2) NOT NULL,
  admin_id INTEGER references admin(id) on delete CASCADE,
  users_id INTEGER references users(id) on delete CASCADE,
  status VARCHAR(255) NOT NULL
);
