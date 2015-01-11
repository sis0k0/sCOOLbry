'use strict';

var passport         = require('passport'),
    FacebookStrategy = require('passport-facebook').Strategy,
    User             = require('mongoose').model('User');

module.exports = function(config) {
    passport.use(new FacebookStrategy({

        // pull in our app id and secret from our auth.js file
        clientID        : config.facebook.clientID,
        clientSecret    : config.facebook.clientSecret,
        callbackURL     : config.facebook.callbackURL

    },

    // facebook will send back the token and profile
    function(token, refreshToken, profile, done) {

        // asynchronous
        process.nextTick(function() {

            // find the user in the database based on their facebook id
            User.findOne({ 'facebook.id' : profile.id }, function(err, user) {

                // if there is an error, stop everything and return that
                // ie an error connecting to the database
                if (err) {
                    return done(err);
                }
                
                // if the user is found, then log them in
                if (user) {
                    return done(null, user); // user found, return that user
                } else {
                    
                    // if there is no user found with that facebook id, create them
                    var newUser            = new User();
                    var possibleUsername   = profile.emails[0].value.split('@')[0]; 
                    User.findUniqueUsername(possibleUsername, null, function(availableUsername) {
                        // set all of the facebook information in our user model
                        console.log(profile);
                        newUser.username       = availableUsername;
                        newUser.firstName      = profile.name.givenName;
                        newUser.lastName       = profile.name.familyName;
                        newUser.email          = profile.emails[0].value; 
                        newUser.facebook.id    = profile.id; // set the users facebook id                   
                        newUser.facebook.token = token; // we will save the token that facebook provides to the user                    
                        newUser.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName; // look at the passport user profile to see how names are returned
                        newUser.facebook.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first


                        // And save the user
                        newUser.save(function(err) {
                            return done(err, newUser);
                        });
                    });
                }

            });
        });

    }));
};