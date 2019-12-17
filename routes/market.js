var express = require('express');
var router1 = express.Router();
const controller = require('../controllers/marketController');

router1.get('/', controller.list);

module.exports = router1;