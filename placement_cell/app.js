var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var flash = require('express-flash')

 /////////////////////////   ROUTES  ??????????????????????
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var companyRouter = require('./routes/company');
var state_cityRouter = require('./routes/state_city');

var studentRouter = require('./routes/student')
var branchRouter = require('./routes/branch')
var session = require('./node_modules/express-session');
var app = express();


/////////////////////////////// SESSION MANAGEMENT /////////////////////

var cookieSession = require('cookie-session')
app.use(cookieSession({
  name: 'session',
  keys: ['KEY1, KEY2'],
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cookieParser("secret"));

app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));


////////////////// DEVELOPER DEFINED ROUTES /////////////////
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/company', companyRouter);
app.use('/state_city', state_cityRouter);

app.use('/student', studentRouter);
app.use('/branch', branchRouter);
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
