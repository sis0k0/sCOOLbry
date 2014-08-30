'use strict';

var passport = require('passport'),
	http = require('http'),
	querystring = require('querystring');

module.exports = {

    login: function(req, res, next) {
		var captchaData = new Object();
		var stopLogin = false;

		captchaData.remoteip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
		captchaData.challenge = req.body.captcha.challenge;
		captchaData.response = req.body.captcha.response;
		captchaData.privatekey = '6Lcy4csSAAAAANa_TKPxw2JPmHL_lk2Ibl8HmHre';
		var captchaData = querystring.stringify(captchaData);
		
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
				stopLogin = true;
				
			});

			response.on('data', function(chunk) {
				body += chunk;
			});

			response.on('end', function() {
				var success, error_code, parts;

				parts = body.split('\n');
				success = parts[0];
				error_code = parts[1];

				if (success == 'false') {
					stopLogin = true;
					res.send({success:false, captchaError: true});
				}else{
					var auth = passport.authenticate('local', function(err, user) {
						if (err) return next(err);
						if (!user) {
							res.send({success: false, captchaError: false})
						}

						req.logIn(user, function(err) {
							if (err) return next(err);
							res.send({success: true, user: user});
						})
					});
					

					auth(req, res, next);
				
				
				}
				
				console.log(success+' '+error_code);
			});
		});
		request.write(captchaData, 'utf8');
		request.end();
   
    },
    logout: function(req, res, next) {
        req.logout();
        res.end();
    },
    isAuthenticated: function(req, res, next) {
        if (!req.isAuthenticated()) {
            res.status(403);
            res.end();
        }
        else {
            next();
        }
    },
    isInRole: function(role) {
        return function(req, res, next) {
            if (req.isAuthenticated() && req.user.roles.indexOf(role) > -1) {
                next();
            }
            else {
                res.status(403);
                res.end();
            }
        }
    },
    isAuthenticatedOrAdmin: function(req, res, next) {
		
		if(req.isAuthenticated() || req.user.roles.indexOf('admin') > -1){
			next();
		}else{
			res.status(403);
            res.end();
		}
		
    },
}
