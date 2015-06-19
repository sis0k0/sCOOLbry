'use strict';

var Notification = require('mongoose').model('Notification'),
    errors       = require('../../utilities/httpErrors');

module.exports = function(req, res, next) {
    var socketio = req.app.get('socketio'); // take out socket instance from the app container
    
    // Find notification
    Notification.findOne({_id: req.params.id}, function(err, notification) {
        if(err || !notification) {
            return next(new errors.DatabaseError(err, 'Notification'));
        } else {

            // If it exists - remove it
            Notification.remove({_id: req.params.id}, function(err) {
                if (err) {
                    return next(new errors.DatabaseError(err, 'Notification'));
                } else {
                    res.status(200).end();
                    notification.action = 'removed';
                    socketio.sockets.emit(req.params.userID + ' notification removed', notification); // broadcast event to the user
                }
            });
        }
        
    });
};