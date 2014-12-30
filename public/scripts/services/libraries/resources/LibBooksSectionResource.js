'use strict';

app.factory('LibBooksSectionResource', function($resource) {
    var LibBooksSectionResource = $resource('/api/library/section/:section/:libraryID', {id:'@id'}, { update: {method: 'PUT', isArray: false}, 'get': {method: 'GET', isArray: true}});

    return LibBooksSectionResource;
});
