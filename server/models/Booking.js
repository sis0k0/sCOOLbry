'use strict';

var mongoose = require('mongoose');

var bookingSchema = mongoose.Schema({
    userID: String,
    userName: String,
    libraryID: String,
    libraryName: String,
    bookID: String,
    bookName: String,
    bookDate: Date
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
