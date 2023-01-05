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
  // const user_id = req.body.user_id;
  // req.session.user_id = user_id;
  // db.getUserWithId(user_id)
  //   .then(users => {
  //     const tempateVar = {
  //       userID: req.session.user_id
  //     };
  //     res.render('adminPage', tempateVar);
  //   })
  //   .catch(e => {
  //     console.error(e);
  //     res.send(e)
  //   });
  res.render('adminPage')
});

return router;

};
