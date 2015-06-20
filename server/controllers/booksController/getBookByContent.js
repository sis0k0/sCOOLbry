'use strict';

var Book = require('mongoose').model('Book'),
    errors  = require('../../utilities/httpErrors');

// Open elasticsearch connection
var elasticsearch = require('elasticsearch'),
    env = process.env.NODE_ENV || 'production',
    config = require('../../config/config')[env],
    client = new elasticsearch.Client({
        host: config.elasticHost
    });

    /*jshint camelcase: false */

module.exports = function(req, res, next) {

    var phrase = req.body.text;

    // Full text search in elasticsearch for the passed phrase
    client.search({
        index: 'ebook',
        type: 'string',
        body: {
            query: {
                match: {
                    text: {
                        query: phrase,
                        minimum_should_match: '90%',
                        fuzziness: 0.3
                    }
                }
            },
            highlight: {
                fields: {
                    text: {
                        fragment_size: 600,
                        number_of_fragments: 1
                    }
                }
            }
        }
    }).then(function (resp) {
        var hits = resp.hits.hits;
        var ids = [];
        for(var i=0; i<hits.length; i++) {
            ids.push(hits[i]._source.id);
        }

        // Find all books in the Mongo Database
        Book
        .find({_id: {$in: ids}})
        .select('isbn title author cover')
        .exec(function(err, books) {
            if(err) {
                return next(new errors.DatabaseError(err, 'Books'));
            } else {

                book:
                for(var i=0; i<books.length; i++) {
                    bookHits:
                    for(var j=0; j<hits.length; j++) {
                        if(books[i]._id.toString() === hits[j]._source.id.toString()) {
                            books[i].description = hits[j].highlight.text;
                            hits.splice(j, 1);
                            continue book;
                        }
                    }
                }

                res.send(books);
            }
        });
    }, function (err) {
        return next(new errors.DatabaseError(err, 'Books'));
    });

    /*jshint camelcase: true */
};