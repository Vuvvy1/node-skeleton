const express = require('express');
const router  = express.Router();
const {getSingleCard, getMessages, getUserWithId} = require('../db/queries/cards');
const db = require('../db/connection'); //make function in cards.js




router.get("/:id", (req, res) => {
  if(!req.session.user_id){
    req.session.user_id = 'Guest';
  } // ducttape fix
  getSingleCard(req.params.id)
  .then((card) =>{
    getMessages(card.id)
    .then((messages) => {
      getUserWithId(req.session.user_id || "Guest")
    .then(user => {

      const tempateVar = {
        userID: req.session.user_id,
        card,
        messages,
        user
      };
      res.render('messages', tempateVar );
    })
  })
  })
});


router.post("/:id", (req,res) =>{
  console.log(req.body)
  const cards_id = req.params.id
  const users_id = 1
  const message = req.body.message
  getUserWithId(req.session.user_id || "Guest")
    .then(user => {

  db.query(`INSERT INTO message (cards_id, users_id, message) VALUES ($1, $2, $3);`, [cards_id, user.id, message])
  .then(()=> {
    res.redirect(`/messages/${cards_id}`)
  })
  .catch((err) => { //otherwise itll keep loading
    console.log(err)
    res.send("unable to create message")
  })
})
})





module.exports = router;
