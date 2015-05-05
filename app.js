var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var parseurl = require('parseurl');

var config = require('./common/config/config');
var routes = require('./routes/index');
var users = require('./routes/users');
var login = require('./routes/user/login');
var doLogin = require('./routes/user/doLogin');
var logout = require('./routes/user/logout');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
// app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 注册session
app.use(session({
    secret: config.session.secret,
    name: config.session.id,
    cookie: {maxAge: config.session.maxAge},
    resave: false,
    saveUninitialized: true
}));

/**
 * 注册登录拦截器
 **/
app.use(function (req, res, next) {
    var user = req.session.user;

    if (!user) {
        user = req.session.user = {};
    }

    var pathname = parseurl(req).pathname;

    // 设置不加入拦截的请求路径
    // 在routes/config/config.js中配置
    if (pathname != "/" && config.excludePattern.indexOf(pathname) < 0 && !user.email) {
        return res.redirect('/login');
    }

    res.locals.user = user;

    next();
});

/**
 * 配置请求
 **/
app.use('/', routes);
app.use('/users', users);
app.use('/login', login);
app.use('/doLogin', doLogin);
app.use('/logout', logout);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
