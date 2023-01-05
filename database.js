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
// exports.frontPageCards = frontPageCards;

  }

