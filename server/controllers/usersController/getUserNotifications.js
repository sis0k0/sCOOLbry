'use strict';

var Notification = require('mongoose').model('Notification');

module.exports = function(req, res) {
    console.log('inside');
    Notification.find({userID: req.params.id, seen: false}).exec(function(err, collection) {
        if (err) {
            console.log('Cannot load notifications: ' + err);
            res.status(503).send('Cannot connect to database');
        }else{
            console.log(collection);
            res.send(collection);
        }
    });
};