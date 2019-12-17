let mysql = require('mysql');
const connection = require("../config/database.js");
const controller = {};

//RUTAS PARA EL MARKET
controller.list = function(req, res) {
    connection.query("SELECT * FROM currency", function(err, results) {
        res.render('market.ejs', { results: results, percenteage: 1 })
    });
};

module.exports = controller;