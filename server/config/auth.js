'use strict';

var passport     = require('passport'),
    http         = require('http'),
    querystring  = require('querystring'),
    errors       = require('../utilities/httpErrors');


// Private methods

var isAuthenticated = function(req) {
    if (!req.isAuthenticated() || typeof(req.user) === 'undefined') {
        return false;
    }
    else {
        return true;
    }
};


var isAuthorized = function(req) {
    var id;

    if(typeof(req.params.userID) !== 'undefined') {
        id = req.params.userID;
    } else {
        if(typeof(req.body._id) !== 'undefined') {
            id = req.body._id;
        } else {
            id = req.params.id;
        }
    }

    if(String(req.user._id) !== String(id)) {
        return false;
    } else {
        return true;
    }
};

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

// Wrapper methods

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
loginNoCaptcha = function(req, res, next) {
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
    
},
logout = function(req, res) {
    req.logout();
    res.end();
},
isAuthorized = function() {
    return function(req, res, next) {
        if(!isAuthenticated(req)) {
            return next(new errors.ClientError(401));
        } else {
            if(!isAuthorized(req)) {
                return next(new errors.ClientError(403));
            } else {
                next();
            }
        }
    }; 
},
isInRole = function(role) {
    return function(req, res, next) {
        if(!isAuthenticated(req)) {
            return next(new errors.ClientError(401));
        } else if(!roleChecker(req.user.roles, role)) {
            return next(new errors.ClientError(403));
        } else {
            next();
        }

    };
},
isAuthenticatedOrInRole = function(role) {
    return function(req, res, next) {
        if(!isAuthenticated(req)) {
            return next(new errors.ClientError(401));
        } else if(!isAuthorized(req) && !roleChecker(req.user.roles, role)) {
            return next(new errors.ClientError(403));
        } else {
            next();
        }
    };
};

module.exports = {
    login: login,
    loginNoCaptcha: loginNoCaptcha,
    logout: logout,
    isAuthorized: isAuthorized,
    isInRole: isInRole,
    isAuthenticatedOrInRole: isAuthenticatedOrInRole
};