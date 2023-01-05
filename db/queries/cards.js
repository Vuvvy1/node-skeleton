const db = require('../connection');

const getAllCards =  () => {
  const queryString = `
    SELECT cards.*
    FROM cards
    `;
    return db
    .query(queryString)
    .then((res) => res.rows)
    .catch((err) => console.error("query error", err.stack));
}

const getAllLikedCards= (user_id) => {
const queryString = `
  SELECT distinct *
  FROM favourite_items
  JOIN cards on cards.id = cards_id
  WHERE users_id = $1
  `;
  return db
  .query(queryString, [user_id])
  .then((res) => res.rows)
  .catch((err) => console.error("query error", err.stack));
}

const getUserWithId = (id) => {
return db
  .query(`SELECT * FROM users WHERE name = $1;`, [id])
  .then(res => {
    return res.rows[0] || null;
  })
  .catch(err => {
    console.log('Error:', err.stack);
  });
}

module.exports = {getAllCards,getAllLikedCards,getUserWithId}
