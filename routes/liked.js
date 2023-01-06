const express = require('express');
const router  = express.Router();
const db = require('../db/connection');
const cardsQueries = require('../db/queries/cards')


module.exports = function(router, db){
router.get('/', (req, res) => {
  console.log("getAllLikedCards");
  const user_id = 1 //bc no cookies
  cardsQueries.getAllLikedCards(user_id)
  .then(cards => {
    console.log("cards" , cards)
    const tempateVar = {cards: cards, userID: true}
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
return router
}

// module.exports = router;

