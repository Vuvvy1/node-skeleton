const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const pool = new Pool(dbParams);

module.exports = {

  getAllCards: (min_price, max_price) => {
    const queryString = `
      SELECT cards.*
      FROM cards
      WHERE cost < $1 AND cost > $2
      `;
      return pool
      .query(queryString, [max_price, min_price])
      .then((res) => res.rows)
      .catch((err) => console.error("query error", err.stack));
},
getAllLikedCards: (user_id) => {
  const queryString = `
    SELECT distinct *
    FROM favourite_items
    JOIN cards on cards.id = cards_id
    WHERE users_id = $1
    `;
    return pool
    .query(queryString, [user_id])
    .then((res) => res.rows)
    .catch((err) => console.error("query error", err.stack));
},
getUserWithId: (id) => {
  return pool
    .query(`SELECT * FROM users WHERE name = $1;`, [id])
    .then(res => {
      return res.rows[0] || null;
    })
    .catch(err => {
      console.log('Error:', err.stack);
    });
},
}
// exports.frontPageCards = frontPageCards;


//join tabels with cards
