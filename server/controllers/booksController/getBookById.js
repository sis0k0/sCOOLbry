'use strict';

var Book = require('mongoose').model('Book');

module.exports = function(req, res) {
    Book.findOne({_id: req.params.id}).exec(function(err, book) {
        if (err) {
            console.log('Book could not be loaded: ' + err);
            res.status(503).send('Cannot connect to database');
        }

        var otherCharacteristics = ({});

        if(book.author.indexOf('.') > -1) {
            book.author = book.author.substring(0, book.author.indexOf('.') -2);
        }
        if(typeof book.isbn !== 'undefined' && !! book.isbn) {
            otherCharacteristics.isbn = book.isbn;
        }
        if(typeof book.language !== 'undefined' && !! book.language) {
            otherCharacteristics.language = book.language;
        }
        if(typeof book.authorNationality !== 'undefined' && !! book.authorNationality) {
            otherCharacteristics.authorNationality = book.authorNationality;
        }
        if(typeof book.pages !== 'undefined' && !! book.pages) {
            otherCharacteristics.pages = book.pages;
        }
        if(typeof book.edition !== 'undefined' && !! book.edition) {
            otherCharacteristics.edition = book.edition;
        }
        if(typeof book.illustrated !== 'undefined' && !! book.illustrated) {
            otherCharacteristics.illustrated = book.illustrated;
        }
        if(typeof book.published !== 'undefined' && !!book.published) {
            otherCharacteristics.published = book.published.toLocaleString().substring(4, 15);
        }
        if(typeof book.themes !== 'undefined' && book.themes.length>0) {
            otherCharacteristics.themes = book.themes.join(', ');
        }
        if(typeof book.genres !== 'undefined' && book.genres.length>0) {
            otherCharacteristics.genres = book.genres.join(', ');
        }
        book.other = otherCharacteristics;

        res.send(book);
    });
};