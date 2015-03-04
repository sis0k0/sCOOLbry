'use strict';

var encryption = require('../../utilities/encryption'),
    User       = require('mongoose').model('User');

module.exports = function(req, res) {

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
    
    User.update({_id: updatedId}, updatedUserData, {runValidators: true}, function(err) {
        if (err) {
            console.log('Failed to update user: ' + err);
            res.status(400).send({reason: err});
        }
        res.status(200).end();
    });
};