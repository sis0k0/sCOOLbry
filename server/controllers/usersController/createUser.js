'use strict';

var encryption  = require('../../utilities/encryption'),
    User        = require('mongoose').model('User');

module.exports = function(req, res) {
    var newUserData = req.body;
    newUserData.salt = encryption.generateSalt();
    newUserData.hashPass = encryption.generateHashedPassword(newUserData.salt, newUserData.password);
    User.create(newUserData, function(err, user) {
        if (err) {
            console.log('Failed to register new user: ' + err);
            res.status(400).send({reason: err});
        }

        console.log(user);

        if(req.hasOwnProperty('user') && req.user.roles.indexOf('admin')>-1) {
            res.send(user);
        } else {
            req.logIn(user, function(err) {
                if (err) {
                    res.status(403).send({reason: err});
                } else {
                    res.send(user);
                }
            });
        }
    });
};