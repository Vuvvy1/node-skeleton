const express = require('express');
const router  = express.Router();
const userQueries = require('../db/queries/users');



router.get("/liked", (req, res) => {
  res.redirect('/');
});



module.exports = router;
