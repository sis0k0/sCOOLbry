'use strict';

var mongoose = require('mongoose');

var readingSchema = mongoose.Schema({
    userID: String,
    libraryID: String,
    librarian1ID: String,
    librarian2ID: String,
    bookISBN: String,
    startDate: {
		type: Date,
		default: Date.now
    },
    endDate: Date,
    returnDate: Date,
    comment: {
		type: String,
		default: 'The book has been returned in time and in good condition.'
	}
});

var Reading = mongoose.model('Reading', readingSchema);

module.exports.seedInitialReadings = function() {
    Reading.find({}).exec(function(err, collection) {
        if (err) {
            console.log('Cannot find Readings: ' + err);
            return;
		}
		
        if (collection.length === 0) {
			//TODO: Insert some default data
        }
    });
};
