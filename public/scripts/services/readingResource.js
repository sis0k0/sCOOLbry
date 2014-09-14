'use strict';

app.factory('ReadingResource', function($resource) {
    var ReadingResource = $resource('/api/library/add-reading/:id', {id:'@id'}, { update: {method: 'PUT', isArray: false}});

    return ReadingResource;
});
