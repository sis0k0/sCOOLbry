'use strict';

var FavBook = require('mongoose').model('FavBook'),
    errors  = require('../../utilities/httpErrors');

module.exports = function(req, res, next) {
    FavBook.find({userID: req.params.userID, libraryID: req.params.libraryID}).exec(function(err, collection) {

        if (err) {
            return next(new errors.DatabaseError(err, 'Favorite Books'));
        }
        res.send(collection);
    });
};