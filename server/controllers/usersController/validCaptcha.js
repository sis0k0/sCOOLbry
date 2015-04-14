'use strict';

var http        = require('http'),
    querystring = require('querystring');

module.exports = function(req, res, next) {

    if(req.hasOwnProperty('user') && req.user.roles.indexOf('admin') > -1){
        next();
    } else if(req.isAuthenticated()) {
        res.status(403);
        return res.send({reason: 'You are already logged in.'});
    } else {
        var captchaData = {};
        var stopSignUp = false;

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
                stopSignUp = true;
                
            });

            response.on('data', function(chunk) {
                body += chunk;
            });

            response.on('end', function() {
                
                var parts = body.split('\n');
                var success = parts[0];
                var errorCode = parts[1];

                if (success === 'false') {
                    stopSignUp = true;
                    res.status(403);
                    return res.send({reason: 'Wrong RECAPTCHA Challenge.'});
                }else{
                    
                    next();
                    
                }
                
                console.log(success + ' ' + errorCode);
            });
        });
        request.write(captchaData, 'utf8');
        request.end();
    }
};