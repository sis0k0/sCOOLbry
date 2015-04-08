'use strict';

var Notification = require('mongoose').model('Notification');

module.exports = function(req, res) {
    var socketio = req.app.get('socketio'); // take out socket instance from the app container
    
    Notification
    .findOneAndUpdate({_id: req.params.id}, req.body)
    .exec(function(err, notification) {
        if (err) {
            console.log('Cannot load notifications: ' + err);
            res.status(503).send('Cannot connect to database');
        }else{
            notification.action = 'removed';
            socketio.sockets.emit(req.body.userID + ' notification removed', notification);
            res.status(200).end();
        }
    });
};