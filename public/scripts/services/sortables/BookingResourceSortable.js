'use strict';

app.factory('BookingResourceSortable', function($resource) {
    var BookingResourceSortable = $resource('/api/library/booking-sort/:libraryID/:field/:order/:page/:perPage', {_id:'@id'}, { update: {method: 'PUT', isArray: false}});
    
    BookingResourceSortable.prototype.isAdmin = function() {
        return this.roles && this.roles.indexOf('admin') > -1;
    };

    return BookingResourceSortable;
});
