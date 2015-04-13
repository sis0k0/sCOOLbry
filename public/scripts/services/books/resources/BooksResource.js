'use strict';

app.factory('BooksResource', function($resource) {
    var BooksResource = $resource('/api/books/import', {}, { save: {method: 'POST'}});
    return BooksResource;
});
