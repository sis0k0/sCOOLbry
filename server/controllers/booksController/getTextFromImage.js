'use strict';

var tesseract = require('node-tesseract');

module.exports = function(req, res) {
    var file = req.files[Object.keys(req.files)[0]];
    tesseract.process(file.path, {l:'eng'}, function(err, text) {
        if(err) {
            res.status(400).send({reason: err});
            console.error(err);
        } else {
            res.send(text);
            console.log(text);
        }
    });
};
