var express = require('express');
var router = express.Router();
const controller = require('../controllers/walletController');

router.get('/', controller.listWallet);
router.post('/', controller.updateWallet);
router.get('/delete/:id', controller.deleteTransaction);

module.exports = router;