'use strict';

// var Book = require('mongoose').model('Book'),
var ePub = require('epub');


module.exports = function(req, res) {

    var epub = new ePub(req.params.filePath);

    epub.on('error', function (err) {
        res.send(err);
    });

    epub.on('end', function () {

        var chaptersText = [];

        console.log(epub.metadata);
        epub.flow.forEach(function(chapter){

            epub.getChapterRaw(chapter.id, function(err, text) {

                if(err) {
                    res.send(err);
                } else {
                    chaptersText.push(text);

                    if(chapter.id===epub.flow[epub.flow.length-1].id) {
                        res.send(chaptersText);
                    }
                }
            });

        });


    });

    epub.parse();

};