'use strict';

var LibFines = require('mongoose').model('LibFines');

module.exports = function(req, res) {
    LibFines.find({userID: req.params.userID }).exec(function(err, collection) {

        if (err) {
            res.status(400).send(err);
        }


        res.send(collection);
        
    });
};