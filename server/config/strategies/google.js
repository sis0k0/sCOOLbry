'use strict';

var passport         = require('passport'),
    GoogleStrategy   = require('passport-google-oauth').OAuth2Strategy,
    User             = require('mongoose').model('User');


module.exports = function(config) {

    passport.use(new GoogleStrategy({

        clientID        : config.google.clientID,
        clientSecret    : config.google.clientSecret,
        callbackURL     : config.google.callbackURL

    },
    function(token, refreshToken, profile, done) {

        console.log(profile);

        // try to find the user based on their google id
        User.findOne({ 'google.id' : profile.id }, function(err, user) {
            if (err) {
                return done(err);
            }

            if (user) {

                // if a user is found, log them in
                return done(null, user);
            } else {
                // if the user isnt in our database, create a new user
                var newUser          = new User();

                // set all of the relevant information
                newUser.google.id    = profile.id;
                newUser.google.token = token;
                newUser.google.name  = profile.displayName;
                newUser.google.email = profile.emails[0].value; // pull the first email

                // save the user
                newUser.save(function(err) {
                    if (err) {
                        throw err;
                    }
                    
                    return done(null, newUser);
                });
            }
        });

    }));

};