'use strict';

var FavBook = require('mongoose').model('FavBook'),
    errors  = require('../../utilities/httpErrors');

module.exports = function(req, res, next) {

    FavBook.findOne({userID: req.params.userID, bookID: req.params.bookID}).exec(function(err, favorite) {
        if (err || !favorite) {
            return next(new errors.DatabaseError(err, 'Favorite Book'));
        } else {
            res.send(true);
        }
    });

};