app.factory('BookResourceSortable', function($resource) {
	var BookResourceSortable = $resource('/api/book/sort/:field/:order/:page/:perPage', {_id:'@id'}, { update: {method: 'PUT', isArray: false}});
    
    BookResourceSortable.prototype.isAdmin = function() {
        return this.roles && this.roles.indexOf('admin') > -1;
    };

    return BookResourceSortable;
});
