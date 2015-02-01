'use strict';

var Reading = require('mongoose').model('Reading'),
    LibBook = require('mongoose').model('LibBook');

module.exports = function(req, res) {

    console.log(req.body);
    
    Reading.update({bookISBN: req.body.bookISBN, userID: req.body.userID, libraryID: req.body.libraryID, returnDate: undefined}, req.body, function(err, reading) {
            
        if(err) {
            console.log(err);
        }
        console.log(reading);
        LibBook.update({libraryID: req.body.libraryID, bookID: req.body.bookID}, {$inc: {available: +1, given: -1}}, function(err) {
            if(err) {
                console.log(err);
            }
            var socketio = req.app.get('socketio'); // take out socket instance from the app container
            socketio.sockets.emit(req.body.bookID, 'increase'); // emit an event for all users viewing the book
            res.end();

        });

    });
};