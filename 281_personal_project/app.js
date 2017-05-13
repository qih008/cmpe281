/*jslint node: true */
var express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    index = require('./routes/index'),
    users = require('./routes/users'),
    file = require('./routes/file'),
    signIn = require('./routes/signIn'),
    student = require('./routes/student'),
    session = require('express-session'),
    signOut = require('./routes/signOut'),
    http = require('http'),
    MySQLStore = require('express-mysql-session')(session),
    app = express(),
    options = {
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'root',
        database: 'session'
    },
    sessionStore = new MySQLStore(options);

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
    key: 'session',
    secret: 'cmpe281',
    store: sessionStore,
    resave: true,
    saveUninitialized: true
}));

app.use('/', index);
app.use('/users', users);
app.post('/:name/file/upload', file.upload);
app.post('/:name/file/submit', file.submit);
app.post('/signIn', signIn.signIn);
app.get('/signIn', signIn.signInView);
app.get('/file', file.fileView);
app.get('/:name/file/download/:filename', file.download);
app.get('/students', student.students);
app.get('/:name/student', student.student);
app.get('/studentsList', student.studentsList);
app.put('/:name/student', student.grade);
app.post('/signOut', signOut.signOut);
app.get('/:student/studentStatus', student.studentStatus);
app.get('/session', student.session);


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
