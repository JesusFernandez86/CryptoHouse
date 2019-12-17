var express = require('express');
var router2 = express.Router();
const controller = require('../controllers/exchangeController');

router2.get('/', controller.listExchange);
router2.post('/exchangeBuy', controller.buyExchange);
router2.post('/buy', controller.buy);


module.exports = router2;