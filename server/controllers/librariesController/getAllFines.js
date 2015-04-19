'use strict';

var LibFines = require('mongoose').model('LibFines');

module.exports = function(req, res) {
    LibFines.find({}).exec(function(err, collection) {
        if (err) {
            console.log('LibFines could not be loaded: ' + err);
        }

        res.send(collection);
    });
};