'use strict';

var encryption = require('../../utilities/encryption'),
    User       = require('mongoose').model('User'),
    errors     = require('../../utilities/httpErrors');

module.exports = function(req, res, next){
    var newUserData = req.body;
    newUserData.salt = encryption.generateSalt();
    newUserData.hashPass = encryption.generateHashedPassword(newUserData.salt, newUserData.password);
    newUserData.roles = 'librarian';

    User.create(newUserData, function(err, user) {
        if (err) {
            return next(new errors.DatabaseError(err, 'User'));
        }
        res.send(user);
    });
};