'use strict';

var Booking      = require('mongoose').model('Booking'),
    Notification = require('../../services/NotificationService');

module.exports = function(req, res) {
    Booking.findOneAndRemove({_id: req.params.id}, function(err, booking) {
        if (err) {
            console.log('Cannot connect to database: ' + err);
            res.status(503).send('Cannot connect to database');
            return;
        } else {

            var socketio = req.app.get('socketio'); // take out socket instance from the app container
            socketio.sockets.emit(booking.bookID, 'increase'); // emit an event for all users viewing the book

            // Notify all subscribed users
            var result = Notification.addBookAvailable(socketio, booking);
            if(result) {
                res.status(400).send({reason: result});
                return;
            } else {
                res.status(200).end();
            }
        }
    });
};