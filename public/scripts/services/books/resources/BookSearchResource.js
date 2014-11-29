'use strict';

app.factory('BookSearchResource', function($resource) {
    var BookSearchResource = $resource('/api/book/search/:phrase', {phrase:'@phrase'}, { update: {method: 'PUT', isArray: false}, get: {method: 'GET', isArray: true}});
    return BookSearchResource;
});
