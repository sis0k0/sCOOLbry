'use strict';

var Reading = require('mongoose').model('Reading'),
    errors  = require('../../utilities/httpErrors');

module.exports = function(req, res, next) {
    Reading.find({libraryID: req.params.libraryID}).distinct('userID').exec(function(err, collection) {
        if (err) {
            return next(new errors.DatabaseError(err, 'Readings'));
        }
        var collection2 = [];

        collection.forEach(function(value){
            collection2.push({userID: value});
        });
        res.send(collection2);
    });
};