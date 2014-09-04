'use strict';

var mongoose = require('mongoose');

var bookSchema = mongoose.Schema({
	isbn: {
        type: String,
        require: '{PATH} is required',
        unique: true
    },
    title: {
        type: String,
        require: '{PATH} is required'
    },
    author: {
        type: String,
        require: '{PATH} is required'
    },
    illustrations: String,
    description: String,
    publisher: {
        type: String,
        require: '{PATH} is required'
    },
    cover: String,
    authorNationality: String,
    language: String,
    themes: [String],
    genre: [String],
    edition: String,
    illustrated: String,
    published: Date
});

var Book = mongoose.model('Book', bookSchema);

module.exports.seedInitialBooks = function() {
    Book.find({}).exec(function(err, collection) {
        if (err) {
            console.log('Cannot find Books: ' + err);
            return;
		}
		
        if (collection.length === 0) {
            Book.create({title: 'Да оцелееш в ПМГ 1 том', author: 'ПМГейци', illustrations: '', description: 'Някои полезни правила за оцеляване в ПМГ', publisher: 'ПМГ', cover: '', authorNationality: 'BG', language: 'BG', themes: ['училище', 'тийнейджърски', 'оцеляване'], genre: ['забавни'], edition: '1', illustrated: 'false', published: new Date('15/09/2015')});
            Book.create({title: 'Да оцелееш в ПМГ 2 том', author: 'ПМГейци', illustrations: '', description: 'Някои полезни правила за оцеляване в ПМГ', publisher: 'ПМГ', cover: '', authorNationality: 'BG', language: 'BG', themes: ['училище', 'тийнейджърски', 'оцеляване'], genre: ['забавни'], edition: '1', illustrated: 'false', published: new Date('15/09/2015')});
            Book.create({title: 'Да оцелееш в ПМГ 3 том', author: 'ПМГейци', illustrations: '', description: 'Някои полезни правила за оцеляване в ПМГ', publisher: 'ПМГ', cover: '', authorNationality: 'BG', language: 'BG', themes: ['училище', 'тийнейджърски', 'оцеляване'], genre: ['забавни'], edition: '1', illustrated: 'false', published: new Date('15/09/2015')});
            Book.create({title: 'Да оцелееш в ПМГ 4 том', author: 'ПМГейци', illustrations: '', description: 'Някои полезни правила за оцеляване в ПМГ', publisher: 'ПМГ', cover: '', authorNationality: 'BG', language: 'BG', themes: ['училище', 'тийнейджърски', 'оцеляване'], genre: ['забавни'], edition: '1', illustrated: 'false', published: new Date('15/09/2015')});
            Book.create({title: 'Да оцелееш в ПМГ 5 том', author: 'ПМГейци', illustrations: '', description: 'Някои полезни правила за оцеляване в ПМГ', publisher: 'ПМГ', cover: '', authorNationality: 'BG', language: 'BG', themes: ['училище', 'тийнейджърски', 'оцеляване'], genre: ['забавни'], edition: '1', illustrated: 'false', published: new Date('15/09/2015')});
            Book.create({title: 'Да оцелееш в ПМГ 6 том', author: 'ПМГейци', illustrations: '', description: 'Някои полезни правила за оцеляване в ПМГ', publisher: 'ПМГ', cover: '', authorNationality: 'BG', language: 'BG', themes: ['училище', 'тийнейджърски', 'оцеляване'], genre: ['забавни'], edition: '1', illustrated: 'false', published: new Date('15/09/2015')});
        }
    });
};
