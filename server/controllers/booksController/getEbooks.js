'use strict';

var Book    = require('mongoose').model('Book'),
    errors  = require('../../utilities/httpErrors');

module.exports = function(req, res, next) {

    Book
    .find()
    .exists('ebookUrl')
    .exec(function(err, collection) {
        if (err) {
            return next(new errors.DatabaseError(err, 'EBooks'));
        }

        res.send(collection);
    });
};