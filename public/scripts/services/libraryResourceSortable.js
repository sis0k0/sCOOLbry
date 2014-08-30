'use strict';

app.factory('LibraryResourceSortable', function($resource) {
	var LibraryResourceSortable = $resource('/api/library/sort/:field/:order/:page/:perPage', {_id:'@id'}, { update: {method: 'PUT', isArray: false}});
    
    LibraryResourceSortable.prototype.isAdmin = function() {
        return this.roles && this.roles.indexOf('admin') > -1;
    };

    return LibraryResourceSortable;
});
