'use strict';

app.factory('BookResourceFilterable', function($resource) {
    var BookResourceFilterable = $resource('/api/books/filter/:field/:order/:page/:perPage/:criteria/:phrase/:libraryID',
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
            update: {method: 'PUT', isArray: true}
        });

    BookResourceFilterable.prototype.isAdmin = function() {
        return this.roles && this.roles.indexOf('admin') > -1;
    };

    return BookResourceFilterable;
});
