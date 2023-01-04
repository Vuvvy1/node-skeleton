const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const pool = new Pool(dbParams);

module.exports = {

  getAllCards: () => {
    const queryString = `
      SELECT cards.*
      FROM cards
      `;
      return pool
      .query(queryString)
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

// exports.frontPageCards = frontPageCards;
  }

