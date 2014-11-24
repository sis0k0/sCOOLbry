'use strict';

var passport      = require('passport'),
    LocalPassport = require('passport-local'),
    path          = require('path'),
    utilities     = require('./utilities'),
    User          = require('mongoose').model('User');

module.exports = function() {
	passport.use(new LocalPassport(function(username, password, done) {
		User.findOne({ username: username }).exec(function(err, user) {
			if (err) {
				console.log('Error loading user: ' + err);
				return;
			}

			if (user && user.authenticate(password)) {
				return done(null, user);
			}
			else {
				return done(null, false);
			}
		});
	}));

	passport.serializeUser(function(user, done) {
		if (user) {
			return done(null, user._id);
		}
	});

	passport.deserializeUser(function(id, done) {
		User.findOne({_id: id}).exec(function(err, user) {
			if (err) {
				console.log('Error loading user: ' + err);
				return;
			}

			if (user) {
				return done(null, user);
			}
			else {
				return done(null, false);
			}
		});
	});

	utilities.walk('./config/strategies').forEach(function(strategyPath) {
		require(path.resolve(strategyPath))();
	});
};