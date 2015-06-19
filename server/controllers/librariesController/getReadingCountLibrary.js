'use strict';

var Reading = require('mongoose').model('Reading'),
    errors  = require('../../utilities/httpErrors');

module.exports = function(req, res, next) {

    var now = new Date();
    Reading.count({libraryID: req.params.libraryID, bookDate: {$gte: now } }).exec(function(err, count) {

        if(err) {
            return next(new errors.DatabaseError(err, 'Readings Count'));
        }

        res.send('' + count);
    });

};