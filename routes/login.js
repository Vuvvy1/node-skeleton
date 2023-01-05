const express = require('express');
const router  = express.Router();
const userQueries = require('../db/queries/users');

router.get("/login", (req, res) => {
  res.render('login');
});
router.post("/login", (req, res) => {
  //
});

// router.get("/login", (req, res) => {
//   if (req.session.user_id) {
//     return res.redirect('/');
//   }
//   // save id in session

//   const templateVars = { user: users[req.session.user_id] };
//   res.render("login", templateVars);
// });


module.exports = router;
