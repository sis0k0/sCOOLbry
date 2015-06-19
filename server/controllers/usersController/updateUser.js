'use strict';

var encryption = require('../../utilities/encryption'),
    User       = require('mongoose').model('User'),
    errors     = require('../../utilities/httpErrors');

module.exports = function(req, res, next) {

    var updatedUserData = req.body;
    if (updatedUserData.password && updatedUserData.password.length > 0) {
        updatedUserData.salt = encryption.generateSalt();
        updatedUserData.hashPass = encryption.generateHashedPassword(updatedUserData.salt, updatedUserData.password);
    }
    var updatedId = req.body._id;
    delete updatedUserData._id;
    delete updatedUserData.$promise;
    delete updatedUserData.$resolved;
    
    if(req.hasOwnProperty('user') && req.user.roles.indexOf('admin') > -1 && req.body.hasOwnProperty('roles')) {
        updatedUserData.roles = req.body.roles;
    }else{
        delete updatedUserData.roles;
    }
    console.log(updatedUserData);
    
    User.update({_id: updatedId}, updatedUserData, {runValidators: true}, function(err) {
        if (err) {
            return next(new errors.DatabaseError(err, 'User'));
        } else {
            res.status(200).end();
        }
            
    });
};