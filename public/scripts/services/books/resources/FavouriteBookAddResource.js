'use strict';

app.factory('FavoriteBookAddResource', function($resource) {
    var FavoriteBookAddResource = $resource('/api/book/addFavorite', {id:'@id'}, { get: {method: 'GET', isArray: true}, update: {method: 'PUT', isArray: false}});
    return FavoriteBookAddResource;
});
