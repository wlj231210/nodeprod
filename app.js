var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var logger = require('morgan');

var indexRouter = require('./routes/index');
var user = require('./routes/api/user');

var app = express();

//数据库
// require(process.cwd() + "/common/db.js")
// require(process.cwd() + "/common/utils.js")

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(indexRouter);
app.use(user);




app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 10 //过期时间设置(单位毫秒)
  }
}));
// app.use(session({
//   name: 'sessionid',
//   store: new FileStore(),//数据持久化方式，这里表示本地文件存储
//   secret: 'sksdfiwieriweixdif22342slsdSsdfc.#sdfdfs*',
//   resave: false,
//   saveUninitialized: true,
//   cookie: {
//     maxAge: 1000 * 60 * 10 //过期时间设置(单位毫秒)
//   }
// }));
// app.use(function (req, res, next) {
//   if (!req.session.user) {
//     if (req.url == "/login") {
//       next();//如果请求的地址是登录则通过，进行下一个请求
//     }
//     else {
//       res.redirect('/login');
//     }
//   } else if (req.session.user) {
//     next();
//   }
// });
// app.use(function (req, res, next) {
//   res.locals.user = req.session.user;
//   var err = req.session.error;
//   res.locals.message = '';
//   if (err) res.locals.message = '<div style="margin-bottom: 20px;color:red;">' + err + '</div>';
//   next();
// });
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
