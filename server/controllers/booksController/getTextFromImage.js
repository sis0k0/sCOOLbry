'use strict';

var tesseract = require('node-tesseract'),
    errors    = require('../../utilities/httpErrors');

module.exports = function(req, res, next) {

    var file = req.files[Object.keys(req.files)[0]];

    tesseract.process(file.path, {l:'eng'}, function(err, text) {
        if(err) {
            return next(new errors.DatabaseError(err, 'Tesseract Text'));
        } else {
            res.send(text);
        }
    });
    
};
