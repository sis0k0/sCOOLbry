'use strict';

module.exports = function(req, res) {

    console.log(req.query.path);

    res.download(req.query.path, 'book.epub',
        function(err) {
            console.log(err);
        });
};