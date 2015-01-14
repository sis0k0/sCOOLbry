'use strict';

app.factory('BookingResource', function($resource) {
    var BookingResource = $resource('/api/booking/:id', {id:'@id'}, 
        {
            update: {method: 'PUT', isArray: false},
            delete: {method: 'DELETE', isArray: false}
        });

    return BookingResource;
});
