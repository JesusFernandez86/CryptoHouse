var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const connection = require('./config/database.js');
const expressLayout = require('express-ejs-layouts')
let mysql = require('mysql');
let marketRouter = require('./routes/market');
let walletRouter = require('./routes/wallet');
let exchangeRouter = require('./routes/exchange');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//config of the app
app.use(expressLayout);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
connection.connect(console.log('connection to databse ok'));
//we tell the app to use all the methods of the indexRouter var
app.use('/', marketRouter);
app.use('/wallet', walletRouter);
app.use('/exchange', exchangeRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;