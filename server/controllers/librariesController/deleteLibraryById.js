'use strict';

var Library = require('mongoose').model('Library'),
    errors  = require('../../utilities/httpErrors');

module.exports = function(req, res, next) {
        
    Library.remove({_id: req.params.id}, function(err) {
        if (err) {
            return next(new errors.DatabaseError(err, 'Library'));
        } else {
            res.send('true');
        }
    });
};