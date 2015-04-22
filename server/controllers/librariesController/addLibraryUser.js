'use strict';

var LibUser = require('mongoose').model('LibUser');

module.exports = function(req, res) {
        
    var newLibraryUser = new Object({});
    newLibraryUser.userID = req.body.userID;
    newLibraryUser.libraryID = req.body.libraryID;
    newLibraryUser.username = req.body.username;
    newLibraryUser.given = req.body.given;
    newLibraryUser.toReturn = req.body.toReturn;
    newLibraryUser.active = req.body.active;

    
    LibUser.create(newLibraryUser, function(err, user){
        if(err) {
            console.log('Failed to add the user to the library: '+err);
            return ;
        }
        
        res.send(user);
    });

};