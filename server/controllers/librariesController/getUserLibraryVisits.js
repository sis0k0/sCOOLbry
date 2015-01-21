'use strict';

var LibVisit = require('mongoose').model('LibVisit');

module.exports = function(req, res) {

    LibVisit.find({userID: req.params.userID}).exec(function(err, collection) {
        if (err) {
            console.log('LibVisits could not be loaded: ' + err);
        }
        res.send(collection);
    });
};