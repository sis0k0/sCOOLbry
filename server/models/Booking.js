'use strict';

var mongoose = require('mongoose');

var bookingSchema = mongoose.Schema({
    userID: String,
    libraryID: String,
    bookID: String,
    bookDate: Date
});

var Booking = mongoose.model('Booking', bookingSchema);

module.exports.seedInitialReadings = function() {
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
