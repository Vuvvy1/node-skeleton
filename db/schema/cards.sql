DROP TABLE IF EXISTS cards CASCADE;

CREATE TABLE cards (
  id SERIAL PRIMARY KEY NOT NULL,
  --admin_id INTEGER REFERENCES admin(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  thumbnail_photo_url VARCHAR(255) NOT NULL,
  cost INTEGER  NOT NULL DEFAULT 0,
  active BOOLEAN NOT NULL DEFAULT TRUE
)
--  INSERT INTO cards (
--      title, thumbnail_photo_url, cost, active)
--     VALUES (
--     'Gliscor','https://assets.pokemon.com/assets/cms2/img/cards/web/SWSH8/SWSH8_EN_141.png', true);
