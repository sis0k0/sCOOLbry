'use strict';

var mongoose = require('mongoose');

var notificationSchema = mongoose.Schema({
    message: {
        type: String,
        require: '{PATH} is required'
    },
    userID: {
        type: String,
        require: '{PATH} is required'
    },
    seen: {
        type: Boolean,
        default: false,
        require: '{PATH} is required'
    }
});

var Notification = mongoose.model('Notification', notificationSchema);

module.exports.seedInitialNotifications = function() {
    Notification.find({}).exec(function(err) {
        if (err) {
            console.log('Cannot find Notifications: ' + err);
            return;
        }
    });
};
