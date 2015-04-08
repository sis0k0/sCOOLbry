'use strict';

app.factory('NotificationResource', function($resource) {
    var NotificationResource = $resource('/api/notifications/:id/:userID', {id:'@_id', userID:'@userID'},
    {
        get: {method: 'GET', isArray: false},
        update: {method: 'PUT', isArray: false}
    });

    return NotificationResource;
});
