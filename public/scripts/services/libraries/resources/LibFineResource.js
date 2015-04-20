'use strict';

app.factory('LibFineResource', function($resource) {
    var LibFineResource = $resource('/api/library/fine', {id:'@id'}, { update: {method: 'PUT', isArray: false}, 'get': {method: 'GET', isArray: true}});

    return LibFineResource;
});
