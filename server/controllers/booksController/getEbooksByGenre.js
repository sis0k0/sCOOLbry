'use strict';

var Book    = require('mongoose').model('Book'),
    errors  = require('../../utilities/httpErrors');

module.exports = function(req, res, next) {

    Book
    .find({genres: { $regex : new RegExp(req.params.genre, 'i') }})
    .exists('ebookUrl')
    .exec(function(err, collection) {

        if (err) {
            return next(new errors.DatabaseError(err, 'Books'));
        }
        res.send(collection);
    });
};