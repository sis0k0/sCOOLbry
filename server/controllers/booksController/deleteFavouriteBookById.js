'use strict';

var FavBook = require('mongoose').model('FavBook'),
    errors  = require('../../utilities/httpErrors');


module.exports = function(req, res, next) {

    FavBook.remove({userID: req.params.userID, bookID: req.params.bookID, libraryID: req.params.libraryID}, function(err) {
        if (err) {
            return next(new errors.DatabaseError(err, 'Favorite Book'));
        }

        res.send('true');
    });
};