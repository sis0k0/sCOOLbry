'use strict';

var mongoose = require('mongoose');

var libBookSchema = mongoose.Schema({
    bookID: String,
    bookISBN: String, 
    libraryID: String,
    bookName: String,
    total: Number,
    available: Number,
    given: {
        type: Number,
        default: 0
    }
});

var LibBook = mongoose.model('LibBook', libBookSchema);

module.exports.seedInitialLibBook = function() {
    LibBook.find({}).exec(function(err, collection) {
        if (err) {
            console.log('Cannot find Libraries: ' + err);
            return;
		}
		
        if (collection.length === 0) {
            LibBook.remove({}, function() {});
            LibBook.create({bookID: '53fdbbf13d77e8971668db43', bookISBN: '23323323232', libraryID: '53f31579fa4b43591545c41a', bookName: 'Да оцелееш в ПМГ 1 том', total: 10, available: 5, given: 5});
            LibBook.create({bookID: '53fdbbf13d77e8971668db44', bookISBN: '23323323233', libraryID: '53f31579fa4b43591545c41a', bookName: 'Да оцелееш в ПМГ 2 том', total: 15, available: 10, given: 5});
            LibBook.create({bookID: '53fdbbf13d77e8971668db45', bookISBN: '23323323234', libraryID: '53f31579fa4b43591545c41a', bookName: 'Да оцелееш в ПМГ 3 том', total: 3, available: 3, given: 0});
            LibBook.create({bookID: '53fdbbf13d77e8971668db46', bookISBN: '23323323235', libraryID: '53f31579fa4b43591545c41a', bookName: 'Да оцелееш в ПМГ 4 том', total: 8, available: 5, given: 3});
        }
    });
};
