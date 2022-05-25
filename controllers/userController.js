var User = require('../models/user');

var passport = require('passport');
var LocalStrategy = require('passport-local');
var crypto = require('crypto');



// Display list of all Authors.
exports.user_login_get = async function(req, res) {
    res.render('login');
};

exports.user_login_post = async function(req, res) {

    res.render('login');
};

exports.user_register_get = async function(req, res) {
    res.render('register');
    
};

exports.all_users_get = async function(req, res) {
    res.render('login');
    

};

exports.logout = function(req,res){
    req.session.destroy(function(err) {
 
        res.redirect('/');
 
    });
}

exports.user_profile = function(req, res, next) {
         
    res.render('user_profile');
 
}