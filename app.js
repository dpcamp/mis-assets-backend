var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var phonesRouter = require('./routes/phones');
var computersRouter = require('./routes/computers');
var srRouter = require('./routes/service-requests');
var reportsRouter = require('./routes/reports');

var corsOptions = {
  origin: ['http://192.168.235.97:4200','http://pebud.vmsinc.org'],
  credentials: true,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

var cors = require('cors');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors(corsOptions))
app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/phones', phonesRouter);
app.use('/api/computers', computersRouter);
app.use('/api/service_requests', srRouter);
app.use('/api/reports', reportsRouter);

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
