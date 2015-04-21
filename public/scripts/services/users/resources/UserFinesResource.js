'use strict';

app.factory('UserFinesResource', function($resource) {
	
    var UserFinesResource = $resource('/api/library/finesUser/:userID', {id:'@id'}, { get: {method: 'GET', isArray: true}, update: {method: 'PUT', isArray: false}});

    return UserFinesResource;
});
