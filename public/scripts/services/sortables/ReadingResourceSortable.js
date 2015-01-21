'use strict';

app.factory('ReadingResourceSortable', function($resource) {
    var ReadingResourceSortable = $resource('/api/library/reading-sort/:libraryID/:field/:order/:page/:perPage', {_id:'@id'}, { update: {method: 'PUT', isArray: false}});
    
    ReadingResourceSortable.prototype.isAdmin = function() {
        return this.roles && this.roles.indexOf('admin') > -1;
    };

    return ReadingResourceSortable;
});
