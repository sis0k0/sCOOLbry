'use strict';

var LibFines = require('mongoose').model('LibFines');

module.exports = function(req, res) {
    
    LibFines
    .count({libraryID: req.params.libraryID })
    .exec(function(err, count) {
        if(err) {
            console.log(err);
        }

        res.send('' + count);
    });

};