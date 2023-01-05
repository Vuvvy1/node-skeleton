const express = require('express');
const router  = express.Router();
const userQueries = require('../db/queries/users');



router.get("/liked", (req, res) => {
  res.render('liked');
});



module.exports = router;
