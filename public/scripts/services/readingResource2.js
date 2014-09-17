'use strict';

app.factory('ReadingResource2', function($resource) {
    var ReadingResource2 = $resource('/api/library/remove-reading/:id', {id:'@id'}, { update: {method: 'PUT', isArray: false}});

    return ReadingResource2;
});
