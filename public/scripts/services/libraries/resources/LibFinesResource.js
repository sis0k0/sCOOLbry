'use strict';

app.factory('LibFinesResource', function($resource) {
    var LibFinesResource = $resource('/api/library/fines/:libraryID',
        {
            id: '@id'
        },
        { update: {method: 'PUT', isArray: false}, 'get': {method: 'GET', isArray: true}});

    return LibFinesResource;
});
