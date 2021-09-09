var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require("express-session");
const MongoStore = require('connect-mongo');
const passport = require("passport");
const cors = require("cors");


require('dotenv').config();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var torneoRouter = require('./routes/torneos.routes');
var loginRouter = require('./routes/login.router');
var app = express();
const whitelist = ['https://593fighters.netlify.app','http://localhost:3000'];
const nodb = require('./collections');
app.use(cors({
  origin: function(origin,callback){
    if(whitelist.indexOf(origin) !== -1){
      callback(null,true)
    }
    else{
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials:true,
  methods: "GET,PUT,POST,DELETE"
})); 
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: process.env.SECRET,
  resave: true,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: process.env.DB_CONNECTION_URL,
    dbName: 'fighterdb'
  })
}))
app.use(passport.initialize());
app.use(passport.session());
const inititializePassport = require('./passport-config')
inititializePassport.initialize(passport);
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/torneos',torneoRouter);
app.use('/login',loginRouter);

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
