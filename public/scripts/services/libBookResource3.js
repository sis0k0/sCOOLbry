'use strict';

app.factory('LibBookResource3', function($resource) {
    var LibBookResource3 = $resource('/api/library/book2/:bookID/:libraryID', {id:'@id'}, { update: {method: 'PUT', isArray: false}, 'get': {method: 'GET', isArray: false}});

    return LibBookResource3;
});
