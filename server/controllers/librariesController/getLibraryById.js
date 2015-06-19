'use strict';

var Library = require('mongoose').model('Library'),
    errors  = require('../../utilities/httpErrors');

module.exports = function(req, res, next) {

    Library.findOne({_id: req.params.id}).exec(function(err, library) {
        if (err || !library) {
            return next(new errors.DatabaseError(err, 'Library'));
        } else {
            res.send(library);
        }
    });
};