'use strict';

app.factory('NotificationResource', function($resource) {
    var NotificationResource = $resource('/api/user/notifications/:id', {id:'@_id'},
    {
        get: {method: 'GET', isArray: false},
        update: {method: 'PUT', isArray: false}
    });

    return NotificationResource;
});
