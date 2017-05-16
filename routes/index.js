var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var schema = mongoose.Schema;
var passport = require('passport');
var expressvalidator = require('express-validator');

//mongoose.connect('localhost:27017/userData');

var users = require('../models/users');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Sfeercaptain' });
});

router.get('/login',function(req, res, next) {
    res.render('login.pug', {message : req.flash('loginMessage') });
});

router.get('/register', function(req, res, next){
  res.render('register',{ title: 'Sfeercaptain' ,message: req.flash('signupMessage')});

});

router.get('/loggedInUser', /*isLoggedIn,*/ function(req, res) {
    res.render('loggedInUser.pug', { user: req.user , name: req.user.naam});
});

router.post('/register', passport.authenticate('local-signup', {
    successRedirect : '/loggedInUser', // redirect to the secure profile section
    failureRedirect : '/register', // redirect back to the signup page if there is an error
    failureFlash : true
}));

router.post('/login', passport.authenticate(['local-login'], {
    successRedirect:'/loggedInUser',
    failureRedirect: '/login',
    failureFlash : true
}));

module.exports = router;
