'use strict';

app.factory('BookAvailabilitySubscriptionResource', function($resource) {
    var BookAvailabilitySubscriptionResource = $resource('/api/book/availabilitySubscription', {id:'@id'}, {
        'get': {method: 'GET', isArray: false},
        'update': {method: 'PUT', isArray: false}
    });

    return BookAvailabilitySubscriptionResource;
});
