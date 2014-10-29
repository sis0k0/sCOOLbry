'use strict';

app.factory('LibBooksResource', function($resource) {
    var LibBooksResource = $resource('/api/library/books/:id', {id:'@id'}, { update: {method: 'PUT', isArray: false}, 'get': {method: 'GET', isArray: true}});

    return LibBooksResource;
});
