'use strict';

var Notification = require('mongoose').model('Notification');

module.exports = function(req, res) {
    var socketio = req.app.get('socketio'); // take out socket instance from the app container
    console.log('inside');

    console.log(req);
    Notification.findOneAndUpdate({_id: req.params.id}, req.body).exec(function(err, notification) {
        if (err) {
            console.log('Cannot load notifications: ' + err);
            res.status(503).send('Cannot connect to database');
        }else{
            console.log(notification);
            console.log(req.body.userID);
            notification.action = 'removed';
            console.log(notification);
            socketio.sockets.emit(req.body.userID + ' notification removed', notification);
            res.status(200).end();
        }
    });
};