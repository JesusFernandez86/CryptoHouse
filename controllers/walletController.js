let mysql = require('mysql');
let balance = require('../public/javascripts/Global')
let dateFormat = require('dateformat');
let date = dateFormat("mm/dd/yyyy HH:MM:ss");
const connection = require("../config/database.js");
const controller = {};

//RUTAS PARA EL WALLET
controller.listWallet = function(req, res) {
    connection.query("SELECT * FROM wallet INNER JOIN currency ON wallet.coin_id=currency.coin_id;", function(err, results) {
        connection.query("SELECT * FROM transaction", function(err, results2) {
            res.render('wallet.ejs', { results: results, results2: results2, success: '' })
        })
    });
};

controller.updateWallet = function(req, res) {
    let id = null;
    let amount2 = 0;
    let amount1 = req.body.amount;
    let coin = req.body.selectCoin;
    let finalValue = req.body.finalValue;
    let sql = "SELECT * FROM currency INNER JOIN wallet ON currency.coin_id = wallet.coin_id";
    connection.query(sql, function(err, results) {
        for (res of results) {
            if (res.coin_name == coin) {
                id = res.coin_id;
                amount2 = res.amount - amount1;
                let amount = parseFloat(amount2).toFixed(4);
                connection.query('UPDATE wallet SET amount=? WHERE coin_id=' + id, amount, function(err, results1) {

                });
            }
        }
    });
    res.redirect('/wallet')
}

controller.deleteTransaction = function(req, res) {
    let id = req.params.id;
    console.log(id);
    connection.query("DELETE FROM transaction WHERE transaction_id=" + id, function(err, results) {
        res.redirect('/wallet');
    })
}

module.exports = controller;