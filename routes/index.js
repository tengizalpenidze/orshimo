var express = require('express');
const path = require('path');

var router = express.Router();
var packageController = require('../controllers/packageController')

router.get('/', packageController.get_all_packages);

/* GET home page. */
router.get('/', async function(req, res, next) {
  res.locals.user = req.user
  res.render('index', {path: path, dirname:__dirname});
});

router.get('/questions', async function(req, res, next) {
  res.locals.user = req.user
  res.render('questions');
});

module.exports = router;
