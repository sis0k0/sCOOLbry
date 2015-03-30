'use strict';

var mongoose = require('mongoose');

var bookAvailabilitySubscriptionSchema = mongoose.Schema({
    users: {
        type: [String],
        required: '{PATH} is required'
    },
    bookID: {
        type: String,
        required: '{PATH} is required'
    },
    libraryID: {
        type: String,
        required: '{PATH} is required'
    },
    broadcasted: {
        type: Boolean,
        default: false,
        required: '{PATH} is required'
    }
});

var BookAvailabilitySubscription = mongoose.model('BookAvailabilitySubscription', bookAvailabilitySubscriptionSchema);

module.exports.seedInitialBookAvailabilitySubscriptions = function() {
    BookAvailabilitySubscription.find({}).exec(function(err) {
        if (err) {
            console.log('Cannot find Book Availability Subscription: ' + err);
            return;
        }
    });
};
