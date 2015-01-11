'use strict';

app.factory('LibraryUsersResourceSortable', function($resource) {
    var LibraryUsersResourceSortable = $resource('/api/library/users/:id/:field/:order/:page/:perPage', {_id:'@id'}, { update: {method: 'PUT', isArray: false}});
    

    return LibraryUsersResourceSortable;
});
