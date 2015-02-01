'use strict';

var Booking = require('mongoose').model('Booking');

module.exports = function(req, res) {
    Booking.findOneAndRemove({_id: req.params.id}, function(err, booking) {
        if (err) {
            res.status(503).send('Cannot connect to database');
        }else{
            var socketio = req.app.get('socketio'); // take out socket instance from the app container
            socketio.sockets.emit(booking.bookID, 'increase'); // emit an event for all users viewing the book
            res.send('true');
        }
    });
};