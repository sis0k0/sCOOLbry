'use strict';

app.factory('LibBooksResource', function($resource) {
    var LibBooksResource = $resource('/api/library/books/:id/:available', {id:'@id', available:false}, { update: {method: 'PUT', isArray: false}, 'get': {method: 'GET', isArray: true}});

    return LibBooksResource;
});
