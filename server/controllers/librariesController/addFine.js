'use strict';

var LibFines     = require('mongoose').model('LibFines'),
    Notification = require('../../services/NotificationService'),
    errors       = require('../../utilities/httpErrors');

module.exports = function(req, res, next) {
        
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
            return next(new errors.DatabaseError(err, 'Library Fines'));

        } else {
            var socketio = req.app.get('socketio'); // take out socket instance from the app container
            // Notify the user
            var result = Notification.addFine(socketio, fine.amount, fine.userID);

            if(result) { // If error is returned
                return next(new errors.DatabaseError(err, 'Notification'));
            } else { // If no error occured
                res.send(fine); // Return the fine
            }
        }
    });

};