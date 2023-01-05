const express = require('express');
const router  = express.Router();
const userQueries = require('../db/queries/users');

module.exports = function(router, db) {

router.get("/liked", (req, res) => {
  res.render('liked');
});


};
// module.exports = router;
