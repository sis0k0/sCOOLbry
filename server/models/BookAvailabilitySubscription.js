'use strict';

var mongoose = require('mongoose'),
    ObjectId = mongoose.Schema.ObjectId;

var bookAvailabilitySubscriptionSchema = mongoose.Schema({
    users: {
        type: [ObjectId],
        ref: 'User',
        required: '{PATH} is required'
    },
    bookID: {
        type: ObjectId,
        ref: 'Book',
        required: '{PATH} is required'
    },
    libraryID: {
        type: ObjectId,
        ref: 'Library',
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
