app.factory('UsersResourceSortable', function($resource) {
	var UsersResourceSortable = $resource('/api/users/sort/:field/:order/:page/:perPage', {_id:'@id'}, { update: {method: 'PUT', isArray: false}});
    
    UsersResourceSortable.prototype.isAdmin = function() {
        return this.roles && this.roles.indexOf('admin') > -1;
    };

    return UsersResourceSortable;
});
