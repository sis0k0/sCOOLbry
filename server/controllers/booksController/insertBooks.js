'use strict';

var Book    = require('../../services/BookService'),
    errors  = require('../../utilities/httpErrors');

module.exports = function(req, res, next) {

    var file = req.files[Object.keys(req.files)[0]];

    Book.importBooks(file, req.body.matches, req.body.topRow, req.body.sheet, false, function(err) {
        if(err) {
            return next(new errors.DatabaseError(err, 'Books'));
        } else {
            res.status(200).send('All books successfully imported!');
        }
    });
};