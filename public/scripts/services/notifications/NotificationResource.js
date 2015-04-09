'use strict';

app.factory('NotificationResource', function($resource) {
    var NotificationResource = $resource('/api/notifications/:id/:userID', {id:'@_id', userID:'@userID'},
    {
        get: {method: 'GET', isArray: false},
        delete: {method: 'DELETE', isArray: false}
    });

    return NotificationResource;
});
