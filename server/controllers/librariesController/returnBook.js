'use strict';

var Reading      = require('mongoose').model('Reading'),
    LibBook      = require('mongoose').model('LibBook'),
    Notification = require('../../services/NotificationService'),
    errors       = require('../../utilities/httpErrors');

module.exports = function(req, res, next) {
    
    Reading.update({bookISBN: req.body.bookISBN, userID: req.body.userID, libraryID: req.body.libraryID, returnDate: undefined}, req.body, function(err) {
            
        if(err) {
            return next(new errors.DatabaseError(err, 'Reading'));
        }

        LibBook.update({libraryID: req.body.libraryID, bookID: req.body.bookID}, {$inc: {available: +1, given: -1}}, function(err) {
            if(err) {
                return next(new errors.DatabaseError(err, 'Library Book'));
            }

            Reading.findOne({bookISBN: req.body.bookISBN, userID: req.body.userID, libraryID: req.body.libraryID}, function(err, reading) {
                var socketio = req.app.get('socketio'); // take out socket instance from the app container
                socketio.sockets.emit(req.body.bookID, 'increase'); // emit an event for all users viewing the book
                console.log(reading);
                // Notify all subscribed users
                var result = Notification.addBookAvailable(socketio, reading);
                if(result) {
                    // Don't throw error, just because the notification failed
                    res.status(400).send({reason: result});
                    return;
                } else {
                    res.status(200).end();
                }
            });
        });
    });
};