'use strict';

var errors  = require('../../utilities/httpErrors');

module.exports = function(req, res, next) {

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');

    res.download(req.query.path, 'book.epub',
        function(err) {
            return next(new errors.DatabaseError(err, 'EBook'));
        }
    );
};