'use strict';

var mongoose = require('mongoose');

var favBookSchema = mongoose.Schema({
    bookID: String,
    bookISBN: String,
    libraryID: String,
    bookName: String,
    userID: String
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
