'use strict';

app.factory('BookResourceFilterable', function($resource) {
    var BookResourceFilterable = $resource('/api/books/filter/:field/:order/:page/:perPage/:criteria/:phrase', {_id:'@id'}, { update: {method: 'PUT', isArray: false}});
    
    BookResourceFilterable.prototype.isAdmin = function() {
        return this.roles && this.roles.indexOf('admin') > -1;
    };

    return BookResourceFilterable;
});
