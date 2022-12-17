const express = require('express');
const router  = express.Router();
const userQueries = require('../db/queries/users');


router.get("/", (req, res) => {
  res.render('login');
});

module.exports = router;
