'use strict';

var LibFines = require('mongoose').model('LibFines');

module.exports = function(req, res) {
    LibFines.findOne({_id: req.params.id}).exec(function(err, book) {
        if (err) {
            console.log('Library fine could not be loaded: ' + err);
            res.status(503).send('Cannot connect to database');
        } else if(!book) {
            res.status(404).send('Library fine not found');
        } else {
            res.send(book);
        }
    });
};