'use strict';

app.factory('LibBookResource2', function($resource) {
    var LibBookResource2 = $resource('/api/library/book/:id', {id:'@id'}, { update: {method: 'PUT', isArray: false}, 'get': {method: 'GET', isArray: false}});

    return LibBookResource2;
});
