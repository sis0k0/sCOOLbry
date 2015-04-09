'use strict';

var Reading      = require('mongoose').model('Reading'),
    LibBook      = require('mongoose').model('LibBook'),
    Notification = require('../../services/NotificationService');

module.exports = function(req, res) {

    
    Reading.update({bookISBN: req.body.bookISBN, userID: req.body.userID, libraryID: req.body.libraryID, returnDate: undefined}, req.body, function(err) {
            
        if(err) {
            console.log(err);
        }
        LibBook.update({libraryID: req.body.libraryID, bookID: req.body.bookID}, {$inc: {available: +1, given: -1}}, function(err) {
            if(err) {
                console.log('Cannot connect to database: ' + err);
                res.status(503).send('Cannot connect to database');
            }

            Reading.findOne({bookISBN: req.body.bookISBN, userID: req.body.userID, libraryID: req.body.libraryID}, function(err, reading) {
                var socketio = req.app.get('socketio'); // take out socket instance from the app container
                socketio.sockets.emit(req.body.bookID, 'increase'); // emit an event for all users viewing the book
                console.log(reading);
                // Notify all subscribed users
                var result = Notification.addBookAvailable(socketio, reading);
                if(result) {
                    res.status(402).send({reason: result});
                    return;
                } else {
                    res.status(200).end();
                }
                
            });
        

        });

    });
};