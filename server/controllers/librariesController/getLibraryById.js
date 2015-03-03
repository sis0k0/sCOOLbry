'use strict';

var Library = require('mongoose').model('Library');
module.exports = function(req, res) {

    Library.findOne({_id: req.params.id}).exec(function(err, library) {
        if (err) {
            console.log('Library could not be loaded: ' + err);
            res.status(503).send('Cannot connect to database');
        } else if(!library) {
            res.status(404).send('Library not found');
        } else {
            res.send(library);
        }
    });
};