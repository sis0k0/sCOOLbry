'use strict';

app.factory('BookingResource', function($resource) {
    var BookingResource = $resource('/api/library/addbooking', {id:'@id'}, { update: {method: 'PUT', isArray: false}});

    return BookingResource;
});
