'use strict';

app.factory('UserReadingResource', function($resource) {
    var UserReadingResource = $resource('/api/all-readings/:libraryID/:userID', {id:'@id'}, { update: {method: 'PUT', isArray: false}});

    return UserReadingResource;
});
