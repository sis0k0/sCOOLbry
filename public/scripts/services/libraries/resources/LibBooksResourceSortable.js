'use strict';

app.factory('LibBooksResourceSortable', function($resource) {
    var LibBooksResourceSortable = $resource('/api/library/booksSort/:id/:field/:order/:page/:perPage/:userID', {id:'@id'}, { update: {method: 'PUT', isArray: false}, 'get': {method: 'GET', isArray: false}});

    return LibBooksResourceSortable;
});
