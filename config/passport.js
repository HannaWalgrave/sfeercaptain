var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/users.js');
var mongoose = require('mongoose');

module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
//SIGNUP
    passport.use('local-signup', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'naam',
            passReqToCallback: true
        },
        function(req, email, naam, done) {
            process.nextTick(function() {
                User.findOne({ 'email':  email }, function(err, user) {
                    if (err) {
                        console.log(err);
                        return done(err);
                    }
                    if (user) {
                        return done(null, false,req.flash('signupMessage', 'That email is already taken.'));
                    } else {
                        var newUser = new User();
                        newUser.email = email;
                        newUser.naam = naam;
                        newUser.age = req.param('age');
                        newUser.save(function(err) {
                            if (err){
                                console.log(err);
                                throw err;}
                            return done(null, newUser);
                        });
                    }
                });
            });
        }));
//LOGIN
    passport.use('local-login', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'naam',
            passReqToCallback: true
        },
        function(req, email, password, done) {
            User.findOne({ 'email':  email }, function(err, user) {
                if (err){
                    console.log(err);
                    return done(err);}
                if (!user){
                    console.log(err);
                    return done(null, false,req.flash( 'loginMessage', 'No user found.'));}
                return done(null, user);
            });
        }));

};