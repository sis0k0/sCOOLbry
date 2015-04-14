'use strict';

var Book = require('mongoose').model('Book');

module.exports = function(req, res) {
    var paths = [];

    var unnecessaryFields = ['_id', '__v', 'uploaded'];

    Book.schema.eachPath(function(path) {
        if(unnecessaryFields.indexOf(path)===-1 ) {
            paths.push(path);
        }
    });

    if(req.params.isLibrary === 'true') {
        paths.push('quantity');
    }

    console.log(paths);
    res.send(paths);

};