/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const db = require('../database');
const cookieSession = require("cookie-session");

module.exports = function(router, db) {

router.get('/adminPage', (req, res) => {
  const user_id = req.body.user_id;
  req.session.user_id = user_id;
  db.getUserWithId(user_id)
    .then(users => {
      const tempateVar = {
        userID: req.session.user_id
      };
      res.render('adminPage', tempateVar);
    })
    .catch(e => {
      console.error(e);
      res.send(e)
    });
  res.render('adminPage')
});

router.post("/", (req,res) =>{
  console.log(req.body)
  const cards_id = req.body.card_id
  const users_id = 1
  // db.query(`INSERT INTO favourite_items (cards_id, users_id) VALUES ($1, $2);`, [cards_id, users_id])

  db.query(`INSERT INTO cards (title, thumbnail_photo_url, cost, active)
    VALUES ($1, $2, $3);)`,[cards_id, users_id])
  res.send({
    message: "card liked"
  })
})


return router;

};
