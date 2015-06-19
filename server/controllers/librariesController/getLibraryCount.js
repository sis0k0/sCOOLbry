'use strict';

var Library = require('mongoose').model('Library'),
    errors  = require('../../utilities/httpErrors');

module.exports = function(req, res, next) {

    Library.count({}).exec(function(err, collection) {

        if (err) {
            return next(new errors.DatabaseError(err, 'Libraries Count'));
        }

        res.send('' + collection);
    });
};