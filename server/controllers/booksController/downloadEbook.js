'use strict';

module.exports = function(req, res) {

    res.download(req.query.path, 'book.epub',
        function(err) {
            console.log(err);
        }
    );
};