var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');

var allowCors = require('./middlewares/allow-cors');
var errorHandler = require('./middlewares/error-handler');
var indexRouter = require('./routes/index');
var transactionRouter = require('./routes/transaction');
var pubsubRouter = require('./routes/pubsub');
var requestRouter = require('./routes/request');
var configRouter = require('./routes/setting');
var productRouter = require('./routes/product');
require('./models/relationships');

var app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(allowCors);

app.use('/', indexRouter);
app.use('/pubsub', pubsubRouter);
app.use('/transaction', transactionRouter);
app.use('/request', requestRouter);
app.use('/setting', configRouter);
app.use('/product', productRouter);

app.use(errorHandler);

module.exports = app;
