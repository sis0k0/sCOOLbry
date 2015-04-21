'use strict';

var LibFines = require('mongoose').model('LibFines');

module.exports = function(req, res) {
    LibFines.find({libraryID: req.params.libraryID}).exec(function(err, collection) {
        if (err) {
            console.log('LibFines could not be loaded: ' + err);
        }

        res.send(collection);
    });
};