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
}
// exports.frontPageCards = frontPageCards;
  }

