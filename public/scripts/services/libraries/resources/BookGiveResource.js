'use strict';

app.factory('BookGiveResource', function($resource) {
    var BookGiveResource = $resource('/api/library/add-reading/:id', {id:'@id'}, { update: {method: 'PUT', isArray: false}});

    return BookGiveResource;
});
