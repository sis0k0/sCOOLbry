'use strict';

var LibBook = require('mongoose').model('LibBook');

module.exports = function(req, res) {
    LibBook.count({libraryID: req.params.id}).exec(function(err, collection) {
        if (err) {
            console.log('Library Books could not be loaded: ' + err);
        }

        res.send(''+collection);
    });
};