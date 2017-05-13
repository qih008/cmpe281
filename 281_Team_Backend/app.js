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
    order = require('./routes/order'),
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

app.use('/', index);
app.use('/users', users);


app.get('/San_Jose/order/:id', order.getOrder);
app.get('/San_Jose/orders', order.getOrders);
app.post('/San_Jose/order', order.createOrder);
app.put('/San_Jose/order/:id', order.updateOrder);
app.delete('/San_Jose/order/:id', order.deleteOrder);

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
