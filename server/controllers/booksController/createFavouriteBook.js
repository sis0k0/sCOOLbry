'use strict';

var FavBook = require('mongoose').model('FavBook'),
    errors  = require('../../utilities/httpErrors');


module.exports = function(req, res, next) {

    FavBook.create(req.body, function(err, book) {
        if (err) {
            return next(new errors.DatabaseError(err, 'Favorite Book'));
        }
        res.send(book);
    });
    
};