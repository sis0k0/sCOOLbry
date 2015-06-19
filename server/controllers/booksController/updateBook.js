'use strict';

var Book = require('mongoose').model('Book'),
    errors  = require('../../utilities/httpErrors');

module.exports = function(req, res, next) {
    var updatedBookData = req.body;
    var updatedId = req.body._id;
    delete updatedBookData._id;
    delete updatedBookData.$resolved;
    delete updatedBookData.$promise;
    
    Book.update({_id: updatedId}, updatedBookData, {runValidators: true}, function(err) {
        if(err) {
            return next(new errors.DatabaseError(err, 'Book'));
        } else {
            res.status(200).end();
        }
    });
};