'use strict';

app.factory('LibrarianResource', function($resource) {
    var LibrarianResource = $resource('/api/librarianCreate/:id', {_id:'@id'}, { update: {method: 'PUT', isArray: false}});
    
    
    return LibrarianResource;
});
