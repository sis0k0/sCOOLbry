'use strict';

app.factory('LibVisitResourceSortable', function($resource) {
    var LibVisitResourceSortable = $resource('/api/library/visits/:libraryID/:field/:order/:page/:perPage', {_id:'@id'}, { update: {method: 'PUT', isArray: false}});
    
    LibVisitResourceSortable.prototype.isAdmin = function() {
        return this.roles && this.roles.indexOf('admin') > -1;
    };

    return LibVisitResourceSortable;
});
