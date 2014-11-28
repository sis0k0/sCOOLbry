'use strict';

app.factory('FavouriteBookAddResource', function($resource) {
    var FavouriteBookAddResource = $resource('/api/book/addFavourite', {id:'@id'}, { get: {method: 'GET', isArray: true}, update: {method: 'PUT', isArray: false}});
    return FavouriteBookAddResource;
});
