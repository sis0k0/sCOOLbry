'use strict';

var mongoose = require('mongoose');

var readingSchema = mongoose.Schema({
    userID: String,
    libraryID: String,
    librarian1ID: String,
    librarian2ID: String,
    bookISBN: String,
    startDate: Date,
    endDate: Date,
    returnDate: Date,
    comment: {
		type: String,
		default: 'Книгата е върната в същото състояние, в което е получена и в срок.'
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
