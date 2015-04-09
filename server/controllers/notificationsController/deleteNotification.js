'use strict';

var Notification = require('mongoose').model('Notification');

module.exports = function(req, res) {
    var socketio = req.app.get('socketio'); // take out socket instance from the app container
    
    // Find notification
    Notification.findOne({_id: req.params.id}, function(err, notification) {
        if(err || !notification) {
            console.log('Cannot find notification: ' + err);
            res.status(402).send({reason: err});
        } else {

            // If it exists - remove it
            Notification.remove({_id: req.params.id}, function(err) {
                if (err) {
                    console.log('Cannot remove notification: ' + err);
                    res.status(402).send({reason: err});
                } else {
                    res.status(200).end();
                    notification.action = 'removed';
                    socketio.sockets.emit(req.params.userID + ' notification removed', notification); // broadcast event to the user
                }
            });
        }
        
    });
};