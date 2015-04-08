'use strict';

app.factory('LibBooksResource', function($resource) {
    var LibBooksResource = $resource('/api/library/books/:id/:available/:userID',
        {
            id: '@id',
            available: false,
            userID: false
        },
        { update: {method: 'PUT', isArray: false}, 'get': {method: 'GET', isArray: true}});

    return LibBooksResource;
});
