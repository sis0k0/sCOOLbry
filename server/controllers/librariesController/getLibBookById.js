'use strict';

var LibBook = require('mongoose').model('LibBook');

module.exports = function(req, res) {
    LibBook.findOne({_id: req.params.id}).exec(function(err, book) {
        if (err) {
            console.log('Library book could not be loaded: ' + err);
            res.status(503).send('Cannot connect to database');
        } else if(!book) {
            res.status(404).send('Library book not found');
        } else {
            res.send(book);
        }
    });
};