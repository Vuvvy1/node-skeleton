-- Users table seeds here (Example)
INSERT INTO roles
  (id, name)
VALUES
  (1, 'customer'),
  (2, 'admin');


INSERT INTO users
  (name, password, role_id)
VALUES
  ('Guest', 'password', 1),
  ('Vuvvy', 'password', 2),
  ('poop', 'password', 1);

