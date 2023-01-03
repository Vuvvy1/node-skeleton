/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

router.get('/', (req, res) => {
  res.render('users');
});

// router.get("/login", (req, res) => {
//   res.render('login');
// });
router.post("/login", (req, res) => {
  //
});
// router.get("/register", (req, res) => {
//   res.render('register');
// });
router.post("/register", (req, res) => {
  //
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

module.exports = router;
