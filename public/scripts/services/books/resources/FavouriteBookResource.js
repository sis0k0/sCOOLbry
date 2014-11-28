'use strict';

app.factory('FavouriteBookResource', function($resource) {
    var FavouriteBookResource = $resource('/api/book/favourites/:userID', {id:'@id'}, { get: {method: 'GET', isArray: true}, update: {method: 'PUT', isArray: false}});
    return FavouriteBookResource;
});
