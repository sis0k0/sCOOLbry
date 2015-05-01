'use strict';

var Book = require('mongoose').model('Book');
var elasticsearch = require('elasticsearch');

var env = process.env.NODE_ENV || 'production';
var config = require('../../config/config')[env];
var client = new elasticsearch.Client({
    host: config.elasticHost
});
    /*jshint camelcase: false */

module.exports = function(req, res) {
    console.log('cont: ');
    console.log(req.body.text);
    var phrase = req.body.text;
    // var query = {
    //     bool: {
    //         must: {
    //             match: { 
    //                 text: {
    //                     query: phrase,
    //                     minimum_should_match: '90%'
    //                 }
    //             }
    //         },
    //         should: {
    //             match_phrase: { 
    //                 text: {
    //                     query: phrase,
    //                     slop: 75
    //                 }
    //             }
    //         }
    //     }
    // };





    client.search({
        // q: 'Winnie'
        index: 'ebook',
        type: 'string',
        body: {
            // query: query,
            query: {
                // match_phrase: {
                //     text: {
                //         query: phrase,
                //         slop: 75
                //         // minimum_should_match: '90%',
                //         // fuzziness: 0.3
                //     }
                // }
                match: {
                    text: {
                        query: phrase,
                        minimum_should_match: '90%',
                        fuzziness: 0.3
                    }
                }
                // mlt: {
                //     like_text: phrase,
                //     min_term_freq: 1,
                //     min_doc_freq: 0,
                //     percent_terms_to_match: 0.9
                // }
            },
            highlight: {
                fields: {
                    text: {
                        fragment_size: 300,
                        number_of_fragments: 1
                    }
                }
            }
        }
    }).then(function (resp) {
        console.log('ok');
        var hits = resp.hits.hits;
        // console.log(resp);
        // console.log(hits);
        var ids = [];
        for(var i=0; i<hits.length; i++) {

            console.log(hits[i].highlight.text.toString());
            ids.push(hits[i]._source.id);
        }
        console.log('ok');


        Book
        .find({_id: {$in: ids}})
        .select('isbn title author cover')
        .exec(function(err, books) {
            if(err) {
                res.send(err);
                console.log(err);
                // res.status(400).send(err);
            } else {

                book:
                for(var i=0; i<books.length; i++) {
                    bookHits:
                    for(var j=0; j<hits.length; j++) {
                        if(books[i]._id.toString() === hits[j]._source.id.toString()) {
                            console.log('FOUND!!');
                            books[i].description = hits[j].highlight.text;
                            hits.splice(j, 1);
                            continue book;
                        }
                    }
                }

                res.send(books);



                console.log(books);



            }
        });

    }, function (err) {
        console.log(err.message);
        console.log('err');
        res.status(404).send('No books found!');
    });

    /*jshint camelcase: true */


};