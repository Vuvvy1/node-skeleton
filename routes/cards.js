const express = require('express');
const router  = express.Router();
const userQueries = require('../db/queries/users');
const db = require('../database');
const dbQuery = require('../db/connection');


//req.query,
router.get("/", (req, res) => {
  console.log("cardsRouteHit",req.query)
  const min = req.query.min_price || 0
  const max = req.query.max_price || 100

  db.getAllCards(min, max)
  .then(cards => {
    // console.log(cards)
    res.send({cards})
  })
  .catch(e => {
    console.error("error in api/cards get route", e);
    res.send(e)
  });
});

router.delete('/:id', (req, res) => {
  const cards_id = req.params.id
  dbQuery.query(`DELETE FROM cards where id = $1;`, [cards_id])
  res.send({
    message: "card deleted"
  })
})

module.exports = router;
