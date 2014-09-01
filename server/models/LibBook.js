'use strict';

var mongoose = require('mongoose');

var libBookSchema = mongoose.Schema({
    bookID: String,
    libraryID: String,
    bookName: String,
    total: Number,
    available: Number,
    given: Number
});

var LibBook = mongoose.model('LibBook', libBookSchema);

module.exports.seedInitialLibBook = function() {
    LibBook.find({}).exec(function(err, collection) {
        if (err) {
            console.log('Cannot find Libraries: ' + err);
            return;
		}
		
        if (collection.length === 0) {
            LibBook.create({bookID: '53fdbbf13d77e8971668db43', libraryID: '53f31579fa4b43591545c41a', bookName: 'Да оцелееш в ПМГ 1 том', total: 10, available: 5, given: 5});
            LibBook.create({bookID: '53fdbbf13d77e8971668db44', libraryID: '53f31579fa4b43591545c41a', bookName: 'Да оцелееш в ПМГ 2 том', total: 15, available: 10, given: 5});
            LibBook.create({bookID: '53fdbbf13d77e8971668db45', libraryID: '53f31579fa4b43591545c41a', bookName: 'Да оцелееш в ПМГ 3 том', total: 3, available: 3, given: 0});
            LibBook.create({bookID: '53fdbbf13d77e8971668db46', libraryID: '53f31579fa4b43591545c41a', bookName: 'Да оцелееш в ПМГ 4 том', total: 8, available: 5, given: 3});
            
        }
    });
};
