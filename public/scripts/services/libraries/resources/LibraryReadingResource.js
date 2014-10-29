'use strict';

app.factory('LibraryReadingResource', function($resource) {
    var LibraryReadingResource = $resource('/api/all-readings-library/:libraryID', {id:'@id'}, { update: {method: 'PUT', isArray: false}, get: {method: 'GET', isArray: true}});

    return LibraryReadingResource;
});
