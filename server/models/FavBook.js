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
            FavBook.create({bookID: '53fdbbf13d77e8971668db43', bookISBN: '23323323232', libraryID: '53f31579fa4b43591545c41a', bookName: 'Да оцелееш в ПМГ 1 том', userID: '53ca7bd40339fad80dada051'});
            FavBook.create({bookID: '53fdbbf13d77e8971668db44', bookISBN: '23323323233', libraryID: '53f31579fa4b43591545c41a', bookName: 'Да оцелееш в ПМГ 2 том', userID: '53ca7bd40339fad80dada051'});
            FavBook.create({bookID: '53fdbbf13d77e8971668db45', bookISBN: '23323323234', libraryID: '53f31579fa4b43591545c41a', bookName: 'Да оцелееш в ПМГ 3 том', userID: '53ca7bd40339fad80dada051'});
            FavBook.create({bookID: '53fdbbf13d77e8971668db46', bookISBN: '23323323235', libraryID: '53f31579fa4b43591545c41a', bookName: 'Да оцелееш в ПМГ 4 том', userID: '53ca7bd40339fad80dada051'});
        }
    });
};
