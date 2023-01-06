const express = require('express');
const router  = express.Router();
const userQueries = require('../db/queries/users');



router.get("/messages", (req, res) => {
  res.render('messages');
});

module.exports = router;
