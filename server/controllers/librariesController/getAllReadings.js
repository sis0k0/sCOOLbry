'use strict';

var Reading = require('mongoose').model('Reading'),
    errors  = require('../../utilities/httpErrors');

module.exports = function(req, res, next) {
    Reading.find({}).exec(function(err, collection) {
        if (err) {
            return next(new errors.DatabaseError(err, 'Readings'));
        }

        res.send(collection);
    });
};