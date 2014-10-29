'use strict';

app.factory('BookReturnResource', function($resource) {
    var BookReturnResource = $resource('/api/library/remove-reading/:id', {id:'@id'}, { update: {method: 'PUT', isArray: false}});

    return BookReturnResource;
});
