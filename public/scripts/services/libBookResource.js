'use strict';

app.factory('LibBookResource', function($resource) {
    var LibBookResource = $resource('/api/library/books/:id', {id:'@id'}, { update: {method: 'PUT', isArray: false}, 'get': {method: 'GET', isArray: true}});

    return LibBookResource;
});
