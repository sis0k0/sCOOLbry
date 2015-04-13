'use strict';

var Book = require('../../services/BookService');

module.exports = function(req, res) {

    var file = req.files[Object.keys(req.files)[0]];
    Book.importLibraryBooks(file, req.body.matches, req.body.topRow, req.body.sheet, req.params.id, function(err) {
        if(err) {
            console.log('Books not imported: ' + err);
            res.status(400).send(err);
        } else {
            res.status(200).send('All books successfully imported!');
        }
    });
};