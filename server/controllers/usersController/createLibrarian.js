'use strict';

var encryption  = require('../../utilities/encryption'),
    User        = require('mongoose').model('User');

module.exports = function(req, res){
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
};