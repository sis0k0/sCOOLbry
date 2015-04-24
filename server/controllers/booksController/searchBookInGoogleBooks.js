'use strict';

var https = require('https'),
    querystring = require('querystring'),

    baseUrl = 'https://www.googleapis.com/books/v1/volumes?',
    options = {
        // Google API key
        key: null,
        // Search in a specified field
        field: 'isbn',
        // The position in the collection at which to start the list of results (startIndex)
        offset: 0,
        // The maximum number of elements to return with this request (Max 40) (maxResults)
        limit: 1,
        // Restrict results to books (printType)
        type: 'books',
        // Order results by relevance or newest (orderBy)
        order: 'relevance'
    };


module.exports = function(req, res) {


    var isbn = req.params.isbn;
    isbn = isbn.replace(/-/gi, '');

    // Check the country code of the books for performing language-specific search
    var countryCode = '';
    if(isbn.length===13) {
        countryCode = isbn.substring(0,6);
    } else {
        countryCode = '978' + isbn.substring(0,3);
    }

    // Restrict results to a specified language (two-letter ISO-639-1 code) (langRestrict)
    // Only the bulgarian language is specified, because of the current needs of the application
    if(countryCode==='978619' || countryCode==='978954') {
        options.lang = 'bg';
    } else {
        options.lang = 'en';
    }


    // Create the request uri
    var query = {
        q: isbn,
        startIndex: options.offset,
        maxResults: options.limit,
        printType: options.type,
        orderBy: options.order,
        langRestrict: options.lang
    };

    var uri = baseUrl + querystring.stringify(query);

    // Send Request
    https.get(uri, function(response){
        
        if ( response.statusCode && response.statusCode === 200 ) {

            var body = '';
            response.on('data', function(data) {
                body += data;
            });

            response.on('end', function() {

                // Parse response body
                var data = JSON.parse(body);

                // Array of JSON results to return
                var result = {};

                // Extract useful data
                if( typeof(data.items) !== 'undefined'  && data.items.length>0) {

                    var book = data.items[0].volumeInfo;

                    console.log(book);
                    // Title
                    if (book.title) {
                        result.title = book.title;
                    }
                    // Authors
                    if (book.authors) { 
                        result.author = book.authors.join(',');
                    }
                    // Publisher
                    if (book.publisher) {
                        result.publisher = book.publisher;
                    }
                    // Date Published
                    if (book.publishedDate) {
                        result.published = book.publishedDate;
                    }
                    // Page Count
                    if (book.pageCount) {
                        result.pages = book.pageCount;
                    }
                    // Themes
                    if (book.categories) {
                        result.themes = [];
                        for(var i=0; i<book.categories.length; i++) {
                            result.themes.push(book.categories[i]);
                        }
                    }
                    // Cover
                    if (book.imageLinks && book.imageLinks.thumbnail){
                        result.cover = book.imageLinks.thumbnail;
                    }
                    // Language
                    if (book.language) {
                        result.language = book.language;
                    } else { 
                        result.language = options.lang;
                    }
                    
                    console.log('google books');
                    res.send(result);
                } else {
                    res.send(false);
                }
            });

        } else {
            console.log('Error! Status Code: ' + response.statusCode);
            res.send(false);
        }

    }).on('error', function(err) {
        console.log(err);
        res.send(false);
    });


};