'use strict';

app.factory('LibBookResource', function($resource) {
    var LibBookResource = $resource('/api/library/book2/:bookID/:libraryID', {id:'@id'}, { update: {method: 'PUT', isArray: false}, 'get': {method: 'GET', isArray: false}});

    return LibBookResource;
});
