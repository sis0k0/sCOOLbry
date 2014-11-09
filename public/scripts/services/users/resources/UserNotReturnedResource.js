'use strict';

app.factory('UserNotReturnedResource', function($resource) {
    var UserNotReturnedResource = $resource('/api/library/not-returned/:libraryID/:userID', {id:'@id'}, { get: { method: 'GET', isArray: true}, update: {method: 'PUT', isArray: true}});
	
    return UserNotReturnedResource;
});
