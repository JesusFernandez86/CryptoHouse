let mysql = require('mysql');
let balance = require('../public/javascripts/Global')
let dateFormat = require('dateformat');
let date = dateFormat("mm/dd/yyyy HH:MM:ss");
const connection = require("../config/database.js");
const controller = {};
let localStorage = require('localStorage');

controller.listExchange = function(req, res) {
    connection.query("SELECT * FROM wallet INNER JOIN currency ON wallet.coin_id=currency.coin_id AND wallet.amount >0", function(err, results) {
        console.log(results);
        res.render('exchange.ejs', { results: results })
    });
};

controller.buyExchange = function(req, res) {
    let check = false;
    let amnt1 = 0;
    let amnt2 = 0;
    let amount1 = req.body.amount_buy;
    let coin_from = req.body.coin_buy;
    let amount2 = req.body.amount_buy2;
    let coin_to = req.body.coin_buy2;
    let total_buy = req.body.amount_buy2;
    connection.query("SELECT * FROM currency INNER JOIN wallet ON currency.coin_id=wallet.coin_id", function(err, results) {
        for (res of results) {
            if (res.coin_name == coin_from && coin_from != coin_to) {
                if (res.amount >= amount1) {
                    check = true;
                    id = res.coin_id;
                    amnt1 = res.amount - parseFloat(amount1);
                    let amount = parseFloat(amnt1).toFixed(4);
                    connection.query('UPDATE wallet SET amount=? WHERE coin_id=' + id, amount, function(err, results1) {

                    });
                    connection.query("INSERT INTO transaction SET?", { amount1, total_buy, coin_from, coin_to, date }, function(err, results3) {
                        if (err) {
                            throw err;
                        }
                    });
                }
            }
            for (res of results) {
                if (res.coin_name == coin_to && check == true) {
                    id = res.coin_id;
                    amnt2 = parseFloat(res.amount) + parseFloat(amount2);
                    let amount = parseFloat(amnt2).toFixed(4);
                    connection.query("UPDATE wallet SET amount=? WHERE coin_id=" + id, amount, function(err, results2) {

                    });
                }
            }
        }
    });
    console.log(check);

    res.redirect('/wallet');
}

controller.buy = function(req, res) {
    console.log(balance);
    let id = null;
    let amount5 = 0;
    let amount1 = req.body.buy_usd;
    let total_buy = req.body.total_toBuy;
    let coin_from = "USD";
    let coin_to = req.body.coin_toBuy;
    let sql = "SELECT * FROM currency INNER JOIN wallet ON currency.coin_id = wallet.coin_id";
    connection.query(sql, function(err, results) {
        if (err) {
            throw err
        } else {
            console.log(results);
        }
        localStorage.setItem('balance', JSON.stringify(balance - amount1));
        myValue = localStorage.getItem('balance');
        for (res of results) {
            console.log(myValue);
            if (res.coin_name == coin_to && amount1 <= myValue) {
                id = res.coin_id;
                amount5 = parseFloat(res.amount) + parseFloat(total_buy);
                let amount = parseFloat(amount5).toFixed(4);
                connection.query('UPDATE wallet SET amount=? WHERE coin_id=' + id, amount, function(err, results1) {
                    if (err) {
                        throw err;
                    } else {
                        console.log(results1);
                    }
                });
            }
        }
    });
    connection.query("INSERT INTO transaction SET?", { amount1, total_buy, coin_from, coin_to, date }, function(err, results3) {
        if (err) {
            throw err;
        } else {
            console.log(results3);
        }
    });
    res.redirect('/wallet');
}

module.exports = controller;