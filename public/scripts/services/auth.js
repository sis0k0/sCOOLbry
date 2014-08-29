app.factory('auth', function($http, $q, identity, UsersResource, LibraryResource, BookResource) {
    return {
        signup: function(user) {
            var deferred = $q.defer();

            var user = new UsersResource(user);
            user.$save().then(function() {
                identity.currentUser = user;
                deferred.resolve();
            }, function(response) {
				
                deferred.reject(response.data.reason);
            });

            return deferred.promise;
        },
        update: function(user) {
            var deferred = $q.defer();

            var updatedUser = new UsersResource(user);
            console.log(updatedUser);
            updatedUser._id = identity.currentUser._id;
            updatedUser.$update().then(function() {
                identity.currentUser = updatedUser;
                deferred.resolve();
            }, function(response) {
                deferred.reject(response);
            });

            return deferred.promise;
        },
        updateAsAdmin: function(user) {
            var deferred = $q.defer();

            var updatedUser = new UsersResource(user);
            updatedUser._id = user._id;
            updatedUser.$update().then(function() {
                deferred.resolve();
            }, function(response) {
                deferred.reject(response);
            });

            return deferred.promise;
        },
        updateLibraryAsAdmin: function(library) {
            var deferred = $q.defer();

            var updatedLibrary = new LibraryResource(library);
            updatedLibrary._id = library._id;
            updatedLibrary.$update().then(function() {
                deferred.resolve();
            }, function(response) {
                deferred.reject(response);
            });

            return deferred.promise;
        },
        updateBookAsAdmin: function(book) {
            var deferred = $q.defer();

            var updatedBook = new BookResource(book);
            updatedBook._id = book._id;
            updatedBook.$update().then(function() {
                deferred.resolve();
            }, function(response) {
                deferred.reject(response);
            });

            return deferred.promise;
        },
        login: function(user){
            var deferred = $q.defer();

            $http.post('/login', user).success(function(response) {
                if (response.success) {
                    var user = new UsersResource();
                    angular.extend(user, response.user);
                    identity.currentUser = user;
                    deferred.resolve(true);
                }
                else {
                    deferred.resolve(false);
                }
            });

            return deferred.promise;
        },
        logout: function() {
            var deferred = $q.defer();

            $http.post('/logout').success(function() {
                identity.currentUser = undefined;
                deferred.resolve();
            })

            return deferred.promise;
        },
        isAuthenticated: function() {
            if (identity.isAuthenticated()) {
                return true;
            }
            else {
                return $q.reject('not authorized');
            }
        },
        isAuthorizedForRole: function(role) {
            if (identity.isAuthorizedForRole(role)) {
                return true;
            }
            else {
                return $q.reject('not authorized');
            }
        },
        getMonth: function(user) {
            console.log('dasdsada');
            console.log(user.dateOfBirth); //this works
            console.log(user.dateOfBirth.getMonth()); //this does not! ?!
        }
    }
})
