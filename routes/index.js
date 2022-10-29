// Name:Arvin Almario
// Student Number: 301225269
// Midterm exam

var express = require('express');
var router = express.Router();
let controlerIndex = require('../controllers/index');

/* GET home page. */
router.get('/', controlerIndex.home);

module.exports = router;
