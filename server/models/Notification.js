'use strict';

var mongoose = require('mongoose'),
    ObjectId = mongoose.Schema.ObjectId;

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
        type: ObjectId,
        ref: 'User',
        required: '{PATH} is required'
    },
    date: {
        type: Date,
        default: Date.now
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
