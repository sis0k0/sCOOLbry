'use strict';

var Ebook = require('mongoose').model('eBook');
// var ePub = require('epub');
// var epubParser = require('epub-parser');
// var path = require('path');
// var zip = require('adm-zip');
// var fs = require('fs');

module.exports = function(req, res) {

    console.log(req.files);
    // Check if any file is uploaded
    if(!req.files || req.files.length<0) {
        res.status(400).send({reason: 'No files specified'});
    }

    // Check mimetype
    var file = req.files[Object.keys(req.files)[0]];
    if(file.mimetype !== 'application/epub+zip') {
        res.status(400).send({reason: 'Wrong filetype'});
    }

    var dirname = __dirname;
    var i=3;
    while(i--) {
        dirname = dirname.substring(0, dirname.lastIndexOf('\\'));
    }
    console.log(dirname);

    var path = dirname + '\\' + file.path;
    console.log(path);

    res.send(path);


    // Add new ebook
    Ebook.create({
        path: path,
        uploaderID: req.user._id
    }, function(err, book) {
        if(err) {
            console.log(err);
        }
        console.log(book);
    });

//     var epub = new ePub(file.path);

//     epub.on('error', function (err) {
//         console.log('err');
//         console.log(err);
//         res.status(400).send({reason: err});
//     });

//     epub.on('end', function () {

//         console.log('end');
//         console.log(epub);

//         var chapters = [],
//             htmlCut = /(<([^>]+)>)/ig,
//             chapterCounter = 0;

//         console.log(epub.metadata);

//         epub.flow.forEach(function(chapter){
//             epub.getChapterRaw(chapter.id, function(err, text) {
//                 chapterCounter++;

//                 if(err) {
//                     res.status(400).send({reason: err});
//                 } else {

//                     // Get only the text contents of the chapter
//                     text = (text.indexOf('<body')>-1) ? text.substring(text.indexOf('<body'), text.lastIndexOf('</body')) : text; // Only the text within the body tag
//                     text = text.replace(htmlCut, ''); // Remove the tags
//                     text = text.trim(); // Remove whitespaces

//                     chapters.push(text);

//                     if(chapterCounter===epub.flow.length) { // If all chapters are iterated, add new book
//                         var book = {
//                             title: 'john',
//                             path: file.path,
//                             chapters: chapters,
//                             // uploaderID: req.user._id,
//                         };
// /*jshint camelcase: false */

//                         // Ebook.create(book, function(err, book) {
//                         //     if(err) {
//                         //         console.log(err);
//                         //         res.status(400).send({reason: err});
//                         //     } else {
//                         //         res.send(book);
//                         //     }
//                         // });




//                         // Perform bulk import to the database
//                         var bulk = Ebook.collection.initializeUnorderedBulkOp();
//                         bulk.insert(book);


//                         // books.forEach(function(book) {
//                         //     bulk.insert(book);
//                         // });

//                         bulk.execute(function(err, results) {
//                             if(err) {
//                                 res.status(400).send(err);
//                             }
//                             // console.log(JSON.stringify(results, undefined, 4));

//                             console.log(results);
//                             // Get errs and return results
//                             results = results.toJSON();
//                             var errs = results.writeErrors;
                            
//                             if(errs) {
//                                 res.status(400).send(errs);
//                             } else {

//                                 Ebook.find({$text: { $search: 'Agnes' }}, function(err, data) {
//                                     console.log(err);
//                                     console.log(data);
//                                     res.send(data);
//                                 });
                                
//                             }

//                         });







//                         // Ebook.search({
//                         //     query_string: {
//                         //         'query': {
//                         //             'match_all': {}
//                         //         },
//                         //         'fields': ['_id']
//                         //         // 'highlight': {
//                         //         //     'fields': {'text': {'number_of_fragments': 3}}
//                         //         // }
//                         //     }
//                         // }, {hydrate:true}, function(err, books){
//                         //     console.log(err);
//                         //     console.log(books);
//                         //     // all the people who fit the age group are here!   
//                         // });

//                     }
//                 }
//             });
// /*jshint camelcase: true */

//         });


//     });

//     epub.parse();

};