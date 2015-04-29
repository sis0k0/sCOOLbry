'use strict';

var Book = require('mongoose').model('Book');
var elasticsearch = require('elasticsearch');

var env = process.env.NODE_ENV || 'production';
var config = require('../../config/config')[env];
var client = new elasticsearch.Client({
    host: config.elasticHost,
    log: 'trace'
});

module.exports = function(req, res) {

    var phrase = req.params.phrase;
    /*jshint camelcase: false */

    client.search({
        // q: 'Winnie'
        index: 'ebook',
        type: 'string',
        body: {
            query: {
                match_phrase: {
                    text: phrase
                }
            },
            highlight: {
                fields: {
                    text: {
                        fragment_size: 300,
                        number_of_fragments: 3
                    }
                }
            }
        }
    }).then(function (resp) {
        console.log('ok');
        var hits = resp.hits.hits;
        // console.log(resp);
        // console.log(hits);
        var books = [];
        var ids = [];
        var highlights = [];
        for(var i=0; i<hits.length; i++) {
            books.push({
                id: hits[i]._id,
                highlist: hits[i].highlight
            });

            console.log(hits[i].highlight.text.toString());
            ids.push(hits[i]._id);
            highlights.push(hits[i].highlight);
        }
        console.log('ok');

        res.send(books);

        Book
        .find({_id: ids})
        .exec(function(err, data) {
            if(err) {
                // res.status(400).send(err);
            } else {


                console.log(data);



            }
        });

    }, function (err) {
        console.log(err.message);
        console.log('err');
        res.status(404).send('No book found');
    });

    /*jshint camelcase: true */


};