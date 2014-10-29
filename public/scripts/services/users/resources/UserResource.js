'use strict';

app.factory('UserResource', function($resource) {
    var UserResource = $resource('/api/userInfo/:id', {_id:'@id'}, { update: {method: 'PUT', isArray: false}});

    UserResource.prototype.isAdmin = function() {
        return this.roles && this.roles.indexOf('admin') > -1;
    };

    return UserResource;
});
