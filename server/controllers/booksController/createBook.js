'use strict';

var Book = require('mongoose').model('Book');

module.exports = function(req, res) {
    var newBookData = req.body;
    
    Book.create(newBookData, function(err, book) {
        if (err) {
            console.log('Failed to add new book: ' + err);
            return;
        }

        var socketio = req.app.get('socketio'); // take out socket instance from the app container
        socketio.sockets.emit('book.created', book); // emit an event for all connected clients
        
        res.send(book);
    });
};