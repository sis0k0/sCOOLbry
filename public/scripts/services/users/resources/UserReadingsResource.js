'use strict';

app.factory('UserReadingsResource', function($resource) {
    var UserReadingsResource = $resource('/api/all-readings/:userID', {id:'@id'}, { get: {method: 'GET', isArray: true}, update: {method: 'PUT', isArray: true}});

    return UserReadingsResource;
});