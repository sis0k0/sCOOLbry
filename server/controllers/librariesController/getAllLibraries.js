'use strict';

var Library = require('mongoose').model('Library'),
    errors  = require('../../utilities/httpErrors');

module.exports = function(req, res, next) {
    
    // Get all certified libraries and return them
    Library
    .find({certified: true})
    .exec(function(err, collection) {
        if (err) {
            return next(new errors.DatabaseError(err, 'Library'));
        }

        res.send(collection);
    });
};