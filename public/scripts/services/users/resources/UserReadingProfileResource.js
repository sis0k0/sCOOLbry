'use strict';

app.factory('UserReadingProfileResource', function($resource) {
    var UserReadingProfileResource = $resource('/api/all-readings-profile/:userID', {id:'@id'}, { get: {method: 'GET', isArray: true}, update: {method: 'PUT', isArray: false}});

    return UserReadingProfileResource;
});
