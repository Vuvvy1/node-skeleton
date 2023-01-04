const express = require('express');
const router  = express.Router();
const userQueries = require('../db/queries/users');



router.get("/:id", (req, res) => {
  // save id in session
  res.redirect('/');
});

module.exports = router;
