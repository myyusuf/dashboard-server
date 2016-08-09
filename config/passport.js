// config/passport.js

// load all the things we need
// var LocalStrategy   = require('passport-local').Strategy;
var BasicStrategy   = require('passport-http').BasicStrategy;

// load up the user model
// var User       		= require('../app/models/user');

// expose this function to our app using module.exports
module.exports = function(passport) {

	// =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        /*User.findById(id, function(err, user) {
            done(err, user);
        });*/

        var user = {id: 1, email: 'iedfian.taufiq.akbar@gmail.com', password: 'admin'};
        return done(null, user);
    });

    passport.use(new BasicStrategy(
      function(userid, password, done) {
        // User.findOne({ username: userid }, function (err, user) {
        //   if (err) { return done(err); }
        //   if (!user) { return done(null, false); }
        //   if (!user.verifyPassword(password)) { return done(null, false); }
        //   return done(null, user);
        // });
        // console.log('userid : ' + userid);
        // console.log('password : ' + password);

        var user = {id: 1, username: 'iedfian', password: 'admin'};
        return done(null, user);
      }
    ));

};
