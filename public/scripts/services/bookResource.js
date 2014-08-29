app.factory('BookResource', function($resource) {
    var BookResource = $resource('/api/books/:id', {id:'@id'}, { update: {method: 'PUT', isArray: false}});

    return BookResource;
})
