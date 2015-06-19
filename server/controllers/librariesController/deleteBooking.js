'use strict';

var Booking      = require('mongoose').model('Booking'),
    Notification = require('../../services/NotificationService'),
    errors       = require('../../utilities/httpErrors');

module.exports = function(req, res, next) {

    Booking.findOneAndRemove({_id: req.params.id}, function(err, booking) {
        if (err) {
            return next(new errors.DatabaseError(err, 'Booking'));
        } else {

            var socketio = req.app.get('socketio'); // take out socket instance from the app container
            socketio.sockets.emit(booking.bookID, 'increase'); // emit an event for all users viewing the book

            // Notify all subscribed users
            var result = Notification.addBookAvailable(socketio, booking);
            if (result) {
                res.status(400).send('Notification failed');
            } else {
                res.status(200).end();
            }
        }
    });
};