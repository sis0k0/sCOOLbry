'use strict';

app.factory('FavoriteBookResource', function($resource) {
    var FavoriteBookResource = $resource('/api/book/favorites/:userID', {id:'@id'}, { get: {method: 'GET', isArray: true}, update: {method: 'PUT', isArray: false}});
    return FavoriteBookResource;
});
