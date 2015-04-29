'use strict';

module.exports = function(req, res) {

    // Check if any file is uploaded
    if(!req.files || req.files.length<0) {
        res.status(400).send({reason: 'No files specified'});
    }

    // Check mimetype
    var file = req.files[Object.keys(req.files)[0]];
    if(file.mimetype !== 'application/epub+zip') {
        res.status(400).send({reason: 'Wrong filetype'});
    }

    res.send(file.path);
};