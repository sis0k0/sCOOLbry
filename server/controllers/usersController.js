'use strict';

var encryption  = require('../utilities/encryption'),
	http        = require('http'),
	querystring = require('querystring'),
	User        = require('mongoose').model('User');

module.exports = {
    createUser: function(req, res) {
        var newUserData = req.body;
		newUserData.salt = encryption.generateSalt();
		newUserData.hashPass = encryption.generateHashedPassword(newUserData.salt, newUserData.password);
		User.create(newUserData, function(err, user) {
			if (err) {
				console.log('Failed to register new user: ' + err);
				return;
			}
			if(req.hasOwnProperty('user') && req.user.roles.indexOf('admin')===-1) {
				req.logIn(user, function(err) {
					if (err) {
						res.status(403).send({reason: err});
					}
				});
			}
			res.send(user);
		});
   
   
    },
    createLibrarian: function(req, res){
    	var newUserData = req.body;
		newUserData.salt = encryption.generateSalt();
		newUserData.hashPass = encryption.generateHashedPassword(newUserData.salt, newUserData.password);
		newUserData.roles = 'librarian';
		User.create(newUserData, function(err, user) {
			if (err) {
				console.log('Failed to register new user: ' + err);
				return;
			}
			res.send(user);
		});
    },
    updateUser: function(req, res) {

    	console.log(req.user._id);
    	console.log(req.body._id);
    	
    	if ((req.user._id.toString() === req.body._id.toString()) || (typeof(req.user.roles)!=='undefined' && req.user.roles.indexOf('admin') > -1)) {
            var updatedUserData = req.body;
            if (updatedUserData.password && updatedUserData.password.length > 0) {
                updatedUserData.salt = encryption.generateSalt();
                updatedUserData.hashPass = encryption.generateHashedPassword(updatedUserData.salt, updatedUserData.password);
            }
            var updatedId = req.body._id;
            delete updatedUserData._id;
			delete updatedUserData.$promise;
			delete updatedUserData.$resolved;
            
            if(req.user.roles.indexOf('admin') > -1 && req.body.hasOwnProperty('roles')) {
				updatedUserData.roles = req.body.roles;
            }else{
				delete updatedUserData.roles;
			}
			
            User.update({_id: updatedId}, updatedUserData, function(err) {
            	if(err) {
            		res.status(503).send({reason: 'Cannot connect to database!'});
            	}
            	res.status(200).end();
            });
        }
        else {
            res.status(403).send({reason: 'You are not authorized!'});
        }
    },
    uploadAvatar: function(req, res) {
           
            var currentPath = '../../'+req.files.uploadedFile.path;
            var path = require('path');

            var mimetype = req.files.uploadedFile.mimetype.toString();
            
            if(!(mimetype==='image/gif' || mimetype==='image/jpeg' || mimetype==='image/png' || mimetype==='image/tiff')){
				res.status(403).send('Invalid mime type');
			}else{
				var imgur = require('imgur-node-api');
				var imgurURL = '';
				imgur.setClientID('de1c5c887fbf774');
				imgur.upload(path.join(__dirname, currentPath),function(err, res2){
					if(res2 === undefined || res2.data === undefined) {
						res.status(502).send('Cannot connect to server.');
					}
					imgurURL= res2.data.link;
					imgurURL = imgurURL.substring(0,imgurURL.lastIndexOf('.')) + 'm.' + imgurURL.substring(imgurURL.lastIndexOf('.')+1, imgurURL.length);
					res.send(imgurURL);
				});
			}

			var fs = require('fs');
			
			fs.unlink(path.join(__dirname, currentPath));
	
    },
    getUserCount: function(req, res) {
        User.count({}).exec(function(err, collection) {
            if (err) {
                console.log('Users could not be loaded: ' + err);
            }

            res.send(''+collection);
        });
    },
    getAllUsers: function(req, res) {
        User.find({}).exec(function(err, collection) {
            if (err) {
                console.log('Users could not be loaded: ' + err);
            }

            res.send(collection);
        });
    },
    getAllUsersSearchable: function(req, res) {
        User.find({ $or: [ {username: new RegExp(req.params.phrase, 'i')}, {firstName: new RegExp(req.params.phrase, 'i')}, {lastName: new RegExp(req.params.phrase, 'i')}, {email: new RegExp(req.params.phrase, 'i')} ] }).exec(function(err, collection) {
            if (err) {
                console.log('Users could not be loaded: ' + err);
            }

            res.send(collection);
        });
    },
    getAllUsersSortable: function(req, res) {
		var order, field, page, perPage;
		
		if(req.params.order===undefined) {
			order = 'asc';
		}else{
			order = req.params.order;
		}
		
		if(req.params.field===undefined) {
			field = '_id';
		}else{
			field = req.params.field;
		}
		
		if(req.params.page===undefined) {
			page = 1;
		}else{
			page = req.params.page;
		}
		
		if(req.params.perPage===undefined) {
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
        });
    },
    getUserById: function(req, res) {
        User.findOne({_id: req.params.id}).exec(function(err, user) {
            if (err) {
				res.send('User cannot be found');
				
            }else{
				res.send(user);		
			}
        });
    },
    getUserByUsername: function(req, res) {
        User.findOne({username: req.params.username}).exec(function(err, user) {
            if (err) {
				res.send(false);
            }else{
				if(user===null){
					res.send(false);
				}else{
					res.send(true);
				}
				
			}
        });
    },
    getUserByEmail: function(req, res) {
        User.findOne({email: req.params.email}).exec(function(err, user) {
            if (err) {
				res.send(false);
            }else{
				
				if(user===null){
					res.send(false);
				}else{
					res.send(true);
				}
				
			}
        });
    },
    deleteUserById: function(req, res) {
		
        User.remove({_id: req.params.id}, function(err) {
            if (err) {
					res.send('false');
            }else{
					res.send('true');
					
			}
        });
    },
    validCaptcha: function(req, res, next) {
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
   
   
	}
};
