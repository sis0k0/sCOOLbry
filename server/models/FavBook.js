'use strict';

var mongoose = require('mongoose'),
    ObjectId = mongoose.Schema.ObjectId;

var favBookSchema = mongoose.Schema({
    bookID: {
        type: ObjectId,
        ref: 'Book',
        required: '{PATH} is required'
    },
    bookISBN: {
        type: String,
        required: '{PATH} is required'
    },
    libraryID: {
        type: ObjectId,
        ref: 'Library',
        required: '{PATH} is required'
    },
    bookName: {
        type: String,
        required: '{PATH} is required'
    },
    userID:{
        type: ObjectId,
        ref: 'User',
        required: '{PATH} is required'
    }
});

var FavBook = mongoose.model('FavBook', favBookSchema);

module.exports.seedInitialFavBook = function() {
    FavBook.find({}).exec(function(err, collection) {
        if (err) {
            console.log('Cannot find Libraries: ' + err);
            return;
        }
        
        if (collection.length === 0) {
            FavBook.remove({}, function() {});
        }
    });
};
