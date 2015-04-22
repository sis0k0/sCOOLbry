'use strict';

var LibFines     = require('mongoose').model('LibFines'),
    Notification = require('../../services/NotificationService');

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
            res.send({reason: err});
        } else {

            var socketio = req.app.get('socketio'); // take out socket instance from the app container
            // Notify the user
            var result = Notification.addFine(socketio, fine.amount, fine.userID);
            console.log(result);
            if(result) { // If error is returned
                res.status(400).send({reason: result});
                return;
            } else { // If no error occured
                res.send(fine); // Return the fine
            }
        }
    });

};