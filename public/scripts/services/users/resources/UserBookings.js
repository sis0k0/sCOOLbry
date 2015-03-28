'use strict';

app.factory('UserBookingsResource', function($resource) {
    var UserBookingsResource = $resource('/api/library/bookings-user/:userID', {id:'@id'}, { get: {method: 'GET', isArray: true}, update: {method: 'PUT', isArray: false}});

    return UserBookingsResource;
});
