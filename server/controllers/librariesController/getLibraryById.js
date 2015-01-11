'use strict';

var Library = require('mongoose').model('Library');
module.exports = function(req, res) {

    Library.findOne({_id: req.params.id}).exec(function(err, library) {
        if (err) {
            console.log('Library could not be loaded: ' + err);
        }
        res.send(library);
    });
};