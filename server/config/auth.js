'use strict';

var passport    = require('passport'),
	http        = require('http'),
	querystring = require('querystring');

var roleChecker = function(userRoles, role) {
	switch(role) {
		case 'admin':
			if(userRoles.indexOf('admin') > -1) {
				return true;
			} else {
				return false;
			}
			break;
		case 'moderator': 
			if(userRoles.indexOf('admin') > -1 || userRoles.indexOf('moderator') > -1) {
				return true;
			} else {
				return false;
			}
			break;
		case 'libraryOwner':
			if(userRoles.indexOf('admin') > -1 || userRoles.indexOf('libraryOwner') > -1) {
				return true;
			} else {
				return false;
			}
			break;
		case 'librarian':
			if(userRoles.indexOf('admin') > -1 || userRoles.indexOf('libraryOwner') > -1 || userRoles.indexOf('librarian') > -1) {
				return true;
			} else {
				return false;
			}
			break;
		case 'standart':
			return true;
		default:
			return false;
	}
},

login = function(req, res, next) {
	var captchaData = {};
	var stopLogin = false;

	captchaData.remoteip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
	captchaData.challenge = req.body.captcha.challenge;
	captchaData.response = req.body.captcha.response;
	captchaData.privatekey = '6Lcy4csSAAAAANa_TKPxw2JPmHL_lk2Ibl8HmHre';

	captchaData = querystring.stringify(captchaData);
	
	var requestOptions = {
		host: 'www.google.com',
		path: '/recaptcha/api/verify',
		port: 80,
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Content-Length': captchaData.length
		}
	};
	
	var request = http.request(requestOptions, function(response){
		var body = '';

		response.on('error', function(err) {
			//ERROR code
			console.log(err);
			stopLogin = true;
			
		});

		response.on('data', function(chunk) {
			body += chunk;
		});

		response.on('end', function() {

			var parts = body.split('\n');
			var success = parts[0];
			var errorCode = parts[1];

			if (success === 'false') {
				stopLogin = true;
				res.send({success:false, captchaError: true});
			}else{
				var auth = passport.authenticate('local', function(err, user) {

					if (err){
						return next(err);
					}

					if (!user) {
						res.send({success: false, captchaError: false});
					}

					req.logIn(user, function(err) {
						if (err){
							return next(err);
						}
						res.send({success: true, user: user});
					});
				});

				auth(req, res, next);
			}
			console.log(success + ' ' + errorCode);
		});
	});
	request.write(captchaData, 'utf8');
	request.end();

},
logout = function(req, res) {
	req.logout();
	res.end();
},
isAuthenticated = function(req, res, next) {
	if (!req.isAuthenticated()) {
		res.status(401).send('Sorry, you are not authenticated!');
	}
	else {
		next();
	}
},
isInRole = function(role) {
	return function(req, res, next) {

		if(!req.isAuthenticated() || typeof(req.user) === 'undefined') {
			console.log('not auth');
			res.status(401).send('Sorry, you are not authenticated!');
		} else {
			if(roleChecker(req.user.roles, role)===true) {
				next();
			} else {
				res.status(403).send('Sorry, you are not authorized');
			}
		}

	};
},
isAuthenticatedOrInRole = function(role) {
	return function(req, res, next) {
		if(!req.isAuthenticated() || typeof(req.user)=== 'undefined') {
			res.status(401).send('Sorry, you are not authenticated!');
		} else {
			if(req.params.id!==req.user._id && roleChecker(req.user.roles, role)===false) {
				res.status(403).send('Sorry, you are not authorized!');
			} else {
				next();
			}
		}
	};
},
isAuthenticatedOrAdmin = function(req, res, next) {
	
	if(req.isAuthenticated() || req.user.roles.indexOf('admin') > -1){
		next();
	}else{
		res.status(403).send('Sorry, you are not authorized!');
	}
};

module.exports = {
	login: login,
	logout: logout,
	isAuthenticated: isAuthenticated,
	isAuthenticatedOrInRole: isAuthenticatedOrInRole,
	isInRole: isInRole,
	isAuthenticatedOrAdmin: isAuthenticatedOrAdmin
};
