'use strict';

var Book = require('mongoose').model('Book');

module.exports = function(req, res) {

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    
    Book
    .find()
    .exists('ebookUrl')
    .exec(function(err, collection) {
        if (err) {
            console.log('Books could not be loaded: ' + err);
        }

        res.send(collection);
    });
};