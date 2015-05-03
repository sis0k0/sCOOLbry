'use strict';

var mongoose = require('mongoose'),
    ObjectId = mongoose.Schema.ObjectId;

var readingSchema = mongoose.Schema({
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
    librarian1ID: {
        type: ObjectId,
        ref: 'User',
        required: '{PATH} is required'
    },
    librarian2ID: {
        type: ObjectId,
        ref: 'User'
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
    bookISBN: String,
    startDate: {
        type: Date,
        default: Date.now
    },
    endDate: Date,
    returnDate: Date,
    fined: Date,
    comment: {
        type: String,
        default: ''
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
            var now = new Date();

            Reading.create({userID: '549fc6190e1655f01adb01be', userName: 'sis0k0', libraryID: '5435728127965d5d083da959', libraryName: 'Test Library', librarian1ID: '549fc6190e1655f01adb01be', bookID: '5534ffffa962f7030019b66e', bookName: 'War and Peace (Vintage Classics)', bookISBN: '9781400079988', startDate: now, endDate: now});

        }
      
    });
};
