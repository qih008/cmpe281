var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('sanjose');
});
router.get('/San_Jose', function(req, res, next) {
  res.render('sanjose');
});
router.get('/San_Francisco', function(req, res, next) {
  res.render('sanfrancisco');
});

module.exports = router;
