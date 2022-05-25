var express = require('express');
var router = express.Router();

//====passport files ===\\
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// Require controller modules.
var userController = require('../controllers/userController');

router.all('*', (req,res,next) =>{
  res.locals.user = req.user;
  next();
});

router.get('/', userController.all_users_get);

router.get('/login', userController.user_login_get);
router.get('/register', userController.user_register_get);

router.post('/login', passport.authenticate('local-signin', {
  successRedirect: '/users/profile',
  failureRedirect: '/users/login'
}));

router.get('/logout',userController.logout);

router.get('/profile', isLoggedIn, userController.user_profile);

router.post('/register', passport.authenticate('local-signup', {
  successRedirect: '/users/profile',
  failureRedirect: '/users/login'
}));

//router.get('/create-giftidea', isLoggedIn, giftIdeaController.gift_idea_add_get);


function isLoggedIn(req, res, next) {
 
  if (req.isAuthenticated())
   
      return next();
       
  res.redirect('/login');

}

module.exports = router;