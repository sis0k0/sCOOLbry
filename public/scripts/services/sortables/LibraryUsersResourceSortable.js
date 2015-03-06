'use strict';

app.factory('LibraryUsersResourceSortable', function($resource) {
    var LibraryUsersResourceSortable = $resource('/api/library/users/:id/:field/:order/:page/:perPage', 
        {
            id: '@_id',
            field: '_id',
            order: 'asc',
            page: '1',
            perPage: '10'
        }, 
        { update: {method: 'PUT', isArray: false}});
    

    return LibraryUsersResourceSortable;
});
