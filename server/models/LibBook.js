'use strict';

var mongoose = require('mongoose'),
    ObjectId = mongoose.Schema.ObjectId;

var libBookSchema = mongoose.Schema({
    bookID: {
        type: ObjectId,
        ref: 'Book',
        required: '{PATH} is required'
    },
    bookISBN: {
        type: String,
        unique: true,
        sparse: true,
        match: [
            /((978[\--– ])?[0-9][0-9\--– ]{10}[\--– ][0-9xX])|((978)?[0-9]{9}[0-9Xx])/,
            'ISBN format is not valid'
        ]
    }, 
    bookName: {
        type: String,
        required: '{PATH} is required',
        match: [
            /^.{1,100}$/,
            'Title should be between 1 and 100 characters'
        ]
    },
    libraryID: {
        type: ObjectId,
        ref: 'Library',
        required: '{PATH} is required'
    },
    total: {
        type: Number,
        required: '{PATH} is required',
        min: 0
    },
    available: {
        type: Number,
        required: '{PATH} is required',
        min: 0
    },
    given: {
        type: Number,
        min: 0,
        default: 0
    },
    section: {
        type: Number, // which is the section
        min: 0,
        default: 0
    },
    added: {
        type: Date,
        default: Date.now
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
