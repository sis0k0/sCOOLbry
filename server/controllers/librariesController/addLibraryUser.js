'use strict';

var LibUser = require('mongoose').model('LibUser'),
    errors  = require('../../utilities/httpErrors');

module.exports = function(req, res, next) {
        
    var newLibraryUser = new Object({});
    newLibraryUser.userID = req.body.userID;
    newLibraryUser.libraryID = req.body.libraryID;
    newLibraryUser.username = req.body.username;
    newLibraryUser.given = req.body.given;
    newLibraryUser.toReturn = req.body.toReturn;
    newLibraryUser.active = req.body.active;

    
    LibUser.create(newLibraryUser, function(err, user){

        if(err) {
            return next(new errors.DatabaseError(err, 'Library User'));
        }
        
        res.send(user);
    });

};