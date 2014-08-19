app.factory('LibraryResource', function($resource) {
    var LibraryResource = $resource('/api/libraries/:id', {id:'@id'}, { update: {method: 'PUT', isArray: false}});

    return LibraryResource;
})
