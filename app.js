var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan'); 
var userModel = require('./models/user');

var sequelize = require('./db/db-connect');;

//====passport files ===\\
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local');



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var packageRouter = require('./routes/package');


var app = express();


app.use(session({ secret: 'keyboard cat',resave: true, saveUninitialized:true})); // session secret
 
app.use(passport.initialize());
 
app.use(passport.session()); 

passport.serializeUser((user, cb)=>{
  cb(null,user);
})
passport.deserializeUser((user,cb)=>{
  cb(null,user);
})


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/package', packageRouter);




require('./config/passport/passport.js')(passport, userModel);

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


async function syncDatabase() {
  await sequelize.sync();
  console.log("All models were synchronized successfully.");
}

syncDatabase();

module.exports = app;
