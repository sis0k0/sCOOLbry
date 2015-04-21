'use strict';

var LibFines = require('mongoose').model('LibFines');

module.exports = function(req, res) {
        
    var newFine = new Object({}), now = new Date();
    newFine.userID = req.body.userID;
    newFine.libraryID = req.body.libraryID;
    newFine.username = req.body.username;
    newFine.amount = req.body.amount;
    newFine.reason = req.body.reason;
    newFine.added = now;
    newFine.paid = undefined;
    
    LibFines.create(newFine, function(err, fine){
        if(err) {
            console.log('Failed to add the fine: '+err);
            return ;
        }
        console.log(fine);
        res.send(fine);
    });

};