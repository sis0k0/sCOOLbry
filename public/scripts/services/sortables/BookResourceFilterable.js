'use strict';

app.factory('BookResourceFilterable', function($resource) {
    var BookResourceFilterable = $resource('/api/books/filter/:libraryID/:field/:order/:page/:perPage/:criteria/:phrase',
        {
            field: 'uploaded',
            order: 'desc',
            page: 1,
            perPage: 10,
            criteria: 'all',
            phrase: ' ',
            libraryID: 'all'
        },
        { 
            query: {method: 'GET', isArray: true}
        });

    BookResourceFilterable.prototype.isAdmin = function() {
        return this.roles && this.roles.indexOf('admin') > -1;
    };

    return BookResourceFilterable;
});
