var encryption = require('../utilities/encryption');
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
                    res.status(400);
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

            User.update({_id: req.body._id}, updatedUserData, function() {
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
				console.log(imgurURL);
				imgurURL = imgurURL.substring(0,imgurURL.lastIndexOf(".")) + 's.' + imgurURL.substring(imgurURL.lastIndexOf(".")+1, imgurURL.length);
				res.send(imgurURL);
				
			});
			var fs = require('fs');
			fs.unlink(path.join(__dirname, currentPath));
			

     
    },
    getAllUsers: function(req, res) {
        User.find({}).exec(function(err, collection) {
            if (err) {
                console.log('Users could not be loaded: ' + err);
            }

            res.send(collection);
        })
    }
};
