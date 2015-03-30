'use strict';

var mongoose = require('mongoose');

var notificationSchema = mongoose.Schema({
    message: {
        type: String,
        required: '{PATH} is required'
    },
    href: {
        type: String,
        required: '{PATH} is required'
    },
    userID: {
        type: String,
        required: '{PATH} is required'
    },
    date: {
        type: Date,
        default: Date.now
    },
    seen: {
        type: Boolean,
        default: false,
        required: '{PATH} is required'
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
