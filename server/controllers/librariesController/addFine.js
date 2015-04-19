'use strict';

var LibFines = require('mongoose').model('LibFines');

module.exports = function(req, res) {
        
    var newFine = new Object({});
    newFine.userID = req.body.userID;
    newFine.libraryID = req.body.libraryID;
    newFine.username = req.body.username;
    newFine.reason = req.body.reason;
    newFine.added = Date.now;
    newFine.paid = undefined;

    
    LibFines.create(newFine, function(err, fine){
        if(err) {
            console.log('Failed to add the fine: '+err);
            return ;
        }
        
        res.send(fine);
    });

};