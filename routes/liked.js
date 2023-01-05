const express = require('express');
const router  = express.Router();
const baddb = require('../database'); //refactor to use db folder
const db = require('../db/connection');




router.get('/', (req, res) => {
  console.log("getAllLikedCards");
  const user_id = 1 //bc no cookies
  baddb.getAllLikedCards(user_id)
  .then(cards => {
    const tempateVar = {cards: cards}
    res.render('liked', tempateVar); //not a path its a template
    // res.send({cards})
  })
  .catch(e => {
    console.error(e);
    res.send(e)
  });
});

// post favourites route

router.post("/", (req,res) =>{
  console.log(req.body)
  const cards_id = req.body.card_id
  const users_id = 1
  db.query(`INSERT INTO favourite_items (cards_id, users_id) VALUES ($1, $2);`, [cards_id, users_id])
  res.send({
    message: "card liked"
  })
})

module.exports = router;

// need to join tables to see both favourites as well as the cards joined
// change the way we are rendering each items (liked.ejs)
//we can only like the same element once
//const users_id = 1 : implemet cookie session package, change hard coded to the req.session.user_id property.

//

