/*jslint node: true */
var express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    index = require('./routes/index'),
    users = require('./routes/users'),
    http = require('http'),
    session = require('client-sessions'),
    order = require('./routes/order'),
    drink = require('./routes/drink'),
    app = express();

// view engine setup
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
	cookieName: 'session',
	secret: 'cmpe273',
	duration: 30 * 60 * 1000,
	activeDuration: 5 * 60 * 1000
}));

app.use('/', index);
app.use('/users', users);

app.get('/:city/order/:id', order.getOrder);
app.get('/:city/orders', order.getOrders);
app.post('/:city/order', order.createOrder);
app.put('/:city/order/:id', order.updateOrder);
app.delete('/:city/order/:id', order.deleteOrder);
app.get('/drinks', drink.getDrink);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    "use strict";
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    "use strict";
  // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;

http.createServer(app).listen(app.get('port'), function () {
    "use strict";
    console.log('Express server listening on port ' + app.get('port'));
});
