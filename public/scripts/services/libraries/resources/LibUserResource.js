'use strict';

app.factory('LibUserResource', function($resource) {
    var LibUserResource = $resource('/api/library/add-user', {id:'@id'}, { update: {method: 'PUT', isArray: false}, 'get': {method: 'GET', isArray: true}});

    return LibUserResource;
});
