-- Drop and recreate Widgets table (Example)

DROP TABLE IF EXISTS admin CASCADE;
CREATE TABLE admin (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);
