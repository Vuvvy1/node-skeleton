const express = require('express');
const router  = express.Router();
const userQueries = require('../db/queries/users');
const db = require('../database');

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

module.exports = router;
