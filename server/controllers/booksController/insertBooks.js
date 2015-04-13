'use strict';

var Book = require('../../services/BookService');

module.exports = function(req, res) {

    var file = req.files[Object.keys(req.files)[0]];
    Book.importBooks(file, req.body.matches, req.body.topRow, req.body.sheet, false, function(err, data) {
        if(err) {
            console.log('Books not imported: ' + err);
            res.status(400).send(err);
        } else {
            console.log(data);
            res.status(200).send('All books successfully imported!');
        }
    });
};