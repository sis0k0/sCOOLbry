'use strict';

app.factory('UsersResource', function($resource) {
    var UsersResource = $resource('/api/users/:id', {_id:'@id'}, { update: {method: 'PUT', isArray: false}});
    
    UsersResource.prototype.isAdmin = function() {
        return this.roles && this.roles.indexOf('admin') > -1;
    };

    UsersResource.prototype.isLibrarian = function() {
        return this.roles && this.roles.indexOf('librarian') > -1;
    };
    
    UsersResource.prototype.isLibraryOwner = function() {
        return this.roles && this.roles.indexOf('libraryOwner') > -1;
    };
    
	UsersResource.prototype.isAdminOrLibrarian = function() {
        if(this.roles && this.roles.indexOf('admin') > -1) {
			return true;
		}
		
		if(this.roles && this.roles.indexOf('librarian') > -1) {
			return true;
		}
		
		if(this.roles && this.roles.indexOf('libraryOwner') > -1) {
			return true;
		}
		
		return false;
    };

	UsersResource.prototype.hasLibraryPanel = function() {
		
		if(this.roles && this.roles.indexOf('librarian') > -1) {
			return true;
		}
		
		if(this.roles && this.roles.indexOf('libraryOwner') > -1) {
			return true;
		}
		
		return false;
    };

    return UsersResource;
});
