'use strict';

var mongoose = require('mongoose'),
    ObjectId = mongoose.Schema.ObjectId;

var bookingSchema = mongoose.Schema({
    userID: {
        type: ObjectId,
        ref: 'User',
        required: '{PATH} is required'
    },
    userName: {
        type: String,
        required: '{PATH} is required'
    },
    libraryID: {
        type: ObjectId,
        ref: 'Library',
        required: '{PATH} is required'
    },
    libraryName: {
        type: String,
        required: '{PATH} is required'
    },
    bookID: {
        type: ObjectId,
        ref: 'Book',
        required: '{PATH} is required'
    },
    bookName: {
        type: String,
        required: '{PATH} is required'
    },
    bookDate: {
        type: Date,
        required: '{PATH} is required'
    }
});

var Booking = mongoose.model('Booking', bookingSchema);

module.exports.seedInitialBookings = function() {
    Booking.find({}).exec(function(err, collection) {
        if (err) {
            console.log('Cannot find Bookings: ' + err);
            return;
        }
        
        if (collection.length === 0) {
            //TODO: Insert some default data
        }
    });
};
