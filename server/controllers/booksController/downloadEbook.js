'use strict';

module.exports = function(req, res) {

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');

    res.download(req.query.path, 'book.epub',
        function(err) {
            console.log(err);
        }
    );
};