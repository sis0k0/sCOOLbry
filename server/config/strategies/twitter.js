'use strict';

var passport         = require('passport'),
    TwitterStrategy = require('passport-twitter').Strategy,
    User             = require('mongoose').model('User');

module.exports = function(config) {
    passport.use(new TwitterStrategy({

        consumerKey     : config.twitter.consumerKey,
        consumerSecret  : config.twitter.consumerSecret,
        callbackURL     : config.twitter.callbackURL

    },
    function(token, tokenSecret, profile, done) {

        // make the code asynchronous
         // User.findOne won't fire until we have all our data back from Twitter
        process.nextTick(function() {

            User.findOne({ 'twitter.id' : profile.id }, function(err, user) {
    
                // if there is an error, stop everything and return that
                // ie an error connecting to the database
                if (err) {
                    return done(err);
                }

                // if the user is found then log them in
                if (user) {
                    return done(null, user); // user found, return that user
                } else {
                    var newUser            = new User();
                    var possibleUsername   = profile.username; 
                    User.findUniqueUsername(possibleUsername, null, function(availableUsername) {
                        
                        newUser.username            = availableUsername;
                        newUser.email               = availableUsername+'@scoolbry.com';
                        newUser.firstName           = profile.displayName.substring(0,profile.displayName.indexOf(' '));
                        newUser.lastName            = profile.displayName.substring(profile.displayName.indexOf(' ') + 1, profile.displayName.length);
                        newUser.twitter.id          = profile.id;
                        newUser.twitter.token       = token;
                        newUser.twitter.username    = profile.username;
                        newUser.twitter.displayName = profile.displayName;
    

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