'use strict';

app.factory('LibFinesResourceSortable', function($resource) {
    var LibFinesResourceSortable = $resource('/api/library/fines-sort/:libraryID/:field/:order/:page/:perPage', {id:'@id'}, { update: {method: 'PUT', isArray: false}, 'get': {method: 'GET', isArray: true}});
    return LibFinesResourceSortable;
});
