'use strict';

var Ebook = require('mongoose').model('eBook');
var ePub = require('epub');
// var epubParser = require('epub-parser');
// var path = require('path');
// var zip = require('adm-zip');
// var fs = require('fs');

module.exports = function(req, res) {

    var file = req.files[Object.keys(req.files)[0]];
    var epub = new ePub(file.path);

    epub.on('error', function (err) {
        res.send(err);
    });

    epub.on('end', function () {

        var chapters = [],
            htmlCut = /(<([^>]+)>)/ig,
            chapterCounter = 0;

        console.log(epub.metadata);

        epub.flow.forEach(function(chapter){
            epub.getChapterRaw(chapter.id, function(err, text) {
                chapterCounter++;

                if(err) {
                    res.send(err);
                } else {

                    // Get only the text contents of the chapter
                    text = (text.indexOf('<body')>-1) ? text.substring(text.indexOf('<body'), text.lastIndexOf('</body')) : text; // Only the text within the body tag
                    text = text.replace(htmlCut, ''); // Remove the tags
                    text = text.trim(); // Remove whitespaces

                    chapters.push(text);

                    if(chapterCounter===epub.flow.length) { // If all chapters are iterated, add new book
                        var book = {
                            title: 'john',
                            path: file.path,
                            chapters: chapters,
                            // uploaderID: req.user._id,
                        };
/*jshint camelcase: false */

                        Ebook.create(book, function(err, book) {
                            if(err) {
                                console.log(err);
                                res.send('EBook cannot be added: ' + err);
                            } else {

                                Ebook.find({$text: { $search: 'Agnes' }}, function(err, data) {
                                    console.log(err);
                                    console.log(data);
                                });
                                res.send(book);
                            }
                        });






                        // Ebook.search({
                        //     query_string: {
                        //         'query': {
                        //             'match_all': {}
                        //         },
                        //         'fields': ['_id']
                        //         // 'highlight': {
                        //         //     'fields': {'text': {'number_of_fragments': 3}}
                        //         // }
                        //     }
                        // }, {hydrate:true}, function(err, books){
                        //     console.log(err);
                        //     console.log(books);
                        //     // all the people who fit the age group are here!   
                        // });

                    }
                }
            });
/*jshint camelcase: true */

        });


    });

    epub.parse();

};