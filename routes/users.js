/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const cardsQueries = require('../db/queries/cards');
const cookieSession = require("cookie-session");
const db = require('../db/connection')

module.exports = function(router, db) {

router.get('/', (req, res) => {
  res.render('users');
});

router.get("/login", (req, res) => {
  res.render('login');
});

router.post("/login", (req, res) => {
  // console.log('req.params.id: ', req.params.id);
  // const id = req.params.id;
  const user_id = req.body.user_id;

  req.session.user_id = user_id;
  cardsQueries.getUserWithId(user_id)
    .then(user => {
      // console.log(user);
      if (!user) {
        return res.status(400).send('User doesnt exist. Go <a href="/">Back</a>');
      }

      //req.session.role_id = user.role_id;
      // req.session.user_id = user.id;
      console.log(req.session);
      console.log(user.role_id);
      //if customer
      if (user.role_id === 1) {
        return res.redirect('/');
      }

      //if admin goes to orders
      return res.redirect('/adminPage');
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

router.get('/currentUser', (req, res) => {
  if(req.session.user_id){
    console.log("req.session.user_id ➤", req.session.user_id)
    cardsQueries.getUserWithId(req.session.user_id)
    .then(user => {
      res.json(user)
    })
  }else{
    cardsQueries.getUserWithId('Guest')
  .then(user => {
    res.json(user)
  })}
});

// else{
//   db.getUserWithId(req.session.user_id)
//   .then(user => {
//     res.json(user)
// })}

// router.get("/register", (req, res) => {
//   res.render('register');
// });
router.post("/logout", (req, res) => {
  req.session = null;
  res.redirect("/");
});
router.get("/favourites", (req, res) => {
  res.render('favourites');
});
router.post("/favourites", (req, res) => {
  //
});
router.post("/logout", (req, res) => {
  //
});

return router;

};
