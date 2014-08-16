var encryption = require('../utilities/encryption'),
	http = require('http'),
	querystring = require('querystring');
var User = require('mongoose').model('User');

module.exports = {
    createUser: function(req, res, next) {
        
        var newUserData = req.body;
		newUserData.salt = encryption.generateSalt();
		newUserData.hashPass = encryption.generateHashedPassword(newUserData.salt, newUserData.password);
		User.create(newUserData, function(err, user) {
			if (err) {
				console.log('Failed to register new user: ' + err);
				return;
			}

			req.logIn(user, function(err) {
				if (err) {
					res.status(403);
					return res.send({reason: err.toString()});
				}

				res.send(user);
			})
		});
   
   
    },
    updateUser: function(req, res, next) {
    	if (req.user._id == req.body._id || req.user.roles.indexOf('admin') > -1) {
            var updatedUserData = req.body;
            if (updatedUserData.password && updatedUserData.password.length > 0) {
                updatedUserData.salt = encryption.generateSalt();
                updatedUserData.hashPass = encryption.generateHashedPassword(updatedUserData.salt, updatedUserData.password);
            }
            
            var updatedId = req.body._id;
            delete updatedUserData._id;
            
            if(req.user.roles.indexOf('admin') > -1 && req.body.roles!=undefined) {
				updatedUserData.roles = req.body.roles;
            }else{
				delete updatedUserData.roles;
			}
			
            User.update({_id: updatedId}, updatedUserData, function(err) {
				console.log(err);
                res.end();
            })
        }
        else {
            res.send({reason: 'You do not have permissions!'})
        }
    },
    uploadAvatar: function(req, res, next) {
           
            currentPath = "../../"+req.files.uploadedFile.path;
            var imgur = require('imgur-node-api');
			var path = require('path');
			var imgurURL = "";
			imgur.setClientID("de1c5c887fbf774");
			imgur.upload(path.join(__dirname, currentPath),function(err, res2){
				imgurURL= res2.data.link;
				imgurURL = imgurURL.substring(0,imgurURL.lastIndexOf(".")) + 's.' + imgurURL.substring(imgurURL.lastIndexOf(".")+1, imgurURL.length);
				console.log(imgurURL);
				//console.log("SUCCESS?");
				res.send(imgurURL);
			});
			var fs = require('fs');
			fs.unlink(path.join(__dirname, currentPath));
			//console.log("FAIL!");
     
    },
    getAllUsers: function(req, res) {
        User.find({}).exec(function(err, collection) {
            if (err) {
                console.log('Users could not be loaded: ' + err);
            }

            res.send(collection);
        })
    },
    getAllUsersSortable: function(req, res) {
		var order, field, page, perPage;
		
		if(req.params.order==undefined) {
			order = 'asc';
		}else{
			order = req.params.order;
		}
		
		if(req.params.field==undefined) {
			field = '_id';
		}else{
			field = req.params.field;
		}
		
		if(req.params.page==undefined) {
			page = 1;
		}else{
			page = req.params.page;
		}
		
		if(req.params.perPage==undefined) {
			perPage = 10;
		}else{
			perPage = req.params.perPage;
		}
		
		var sortObject = {};
		sortObject[field] = order;
        User.find({}, null, {sort: sortObject, limit: perPage, skip: (page-1)*perPage}).exec(function(err, collection) {
            if (err) {
                console.log('Users could not be loaded: ' + err);
            }

            res.send(collection);
        })
    },
    getUserById: function(req, res, next) {
        User.findOne({_id: req.params.id}).exec(function(err, user) {
            if (err) {
				res.send("null");
				
            }else{
				
					res.send(user);
					
			}
        })
    },
    getUserByUsername: function(req, res, next) {
        User.findOne({username: req.params.username}).exec(function(err, user) {
            if (err) {
				res.send(false);
            }else{
				//console.log(user);
				
				if(user==null){
					res.send(false);
				}else{
					res.send(true);
				}
				
			}
        })
    },
    getUserByEmail: function(req, res, next) {
        User.findOne({email: req.params.email}).exec(function(err, user) {
            if (err) {
				res.send(false);
            }else{
				//console.log(user);
				
				if(user==null){
					res.send(false);
				}else{
					res.send(true);
				}
				
			}
        })
    },
    deleteUserById: function(req, res, next) {
		
        User.remove({_id: req.params.id}, function(err) {
            if (err) {
					res.send("false");
            }else{
					res.send("true");
					
			}
        });
    },
    validCaptcha: function(req, res, next) {
	
		var captchaData = new Object();
		var stopSignUp = false;

		captchaData.remoteip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
		captchaData.challenge = req.body.captcha.challenge;
		captchaData.response = req.body.captcha.response;
		captchaData.privatekey = "6Lcy4csSAAAAANa_TKPxw2JPmHL_lk2Ibl8HmHre";
		var captchaData = querystring.stringify(captchaData);
		
		var requestOptions = {
			host: "www.google.com",
			path: "/recaptcha/api/verify",
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
				stopSignUp = true;
				
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
					stopSignUp = true;
					res.status(403);
					return res.send({reason: "Wrong RECAPTCHA Challenge."});
				}else{
					
					next();
					
				}
				
				console.log(success+' '+error_code);
			});
		});
		request.write(captchaData, 'utf8');
		request.end();
   
   
	}
};
