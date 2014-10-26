'use strict';

app.factory('identity', function($window, UsersResource) {
    var user;
    if ($window.bootstrappedUserObject) {
        user = new UsersResource();
        angular.extend(user, $window.bootstrappedUserObject);
    }
    return {
        currentUser: user,
        isAuthenticated: function() {
            return !!this.currentUser;
        },
        isAuthorizedForRole: function(userRole) {


            if(!this.currentUser) {
                return false;
            }

            switch(userRole) {
                case 'admin':
                    if(this.currentUser.roles.indexOf('admin') > -1) {
                        return true;
                    } else {
                        return false;
                    }
                    break;
                case 'moderator': 
                    if(this.currentUser.roles.indexOf('admin') > -1 || this.currentUser.roles.indexOf('moderator') > -1) {
                        return true;
                    } else {
                        return false;
                    }
                    break;
                case 'libraryOwner':
                    if(this.currentUser.roles.indexOf('admin') > -1 || this.currentUser.roles.indexOf('libraryOwner') > -1) {
                        return true;
                    } else {
                        return false;
                    }
                    break;
                case 'librarian':
                    if(this.currentUser.roles.indexOf('admin') > -1 || this.currentUser.roles.indexOf('libraryOwner') > -1 || this.currentUser.roles.indexOf('librarian') > -1) {
                        return true;
                    } else {
                        return false;
                    }
                    break;
                case 'standart':
                    return true;
                default:
                    return false;
            }
        }
    };
});
