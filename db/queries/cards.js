const db = require('../connection');

const getAllCards =  (min_price, max_price) => {
  console.log(min_price, max_price)
  const queryString = `
    SELECT cards.*
    FROM cards
    WHERE cost < $1 AND cost > $2
    `;
    return db
    .query(queryString, [max_price, min_price])
    .then((res) => res.rows)
    .catch((err) => console.error("query error1", err.stack));
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

const getSingleCard = (id) => {
  return db
    .query(`SELECT * FROM cards WHERE id = $1;`, [id])
    .then(res => {
      return res.rows[0] || null;
    })
    .catch(err => {
      console.log('Error:', err.stack);
    });
  }

  const getMessages = (id) => {
    return db
      .query(`SELECT message.id, users.name as user_name, created_at, users_id, message
      FROM message
      JOIN users on users_id = users.id
      WHERE cards_id = $1  ;`, [id])
      .then(res => {
        return res.rows;
      })
      .catch(err => {
        console.log('Error:', err.stack);
      });
    }



module.exports = {getAllCards,getAllLikedCards,getUserWithId, getSingleCard , getMessages}
