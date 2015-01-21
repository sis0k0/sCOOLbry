'use strict';

var Reading = require('mongoose').model('Reading');

module.exports = function(req, res) {
    var now = new Date();
    Reading.count({libraryID: req.params.libraryID, bookDate: {$gte: now } }).exec(function(err, count) {
        if(err) {
            console.log(err);
        }

        res.send('' + count);
    });

};