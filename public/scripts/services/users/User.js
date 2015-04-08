'use strict';

app.factory('User', function($http, $q, identity, UsersResource, UserResource, LibraryResource) {
    return {
        signup: function(user) {
            var deferred = $q.defer();

            var newUser = new UsersResource(user);
            newUser.$save().then(function() {
                identity.currentUser = newUser;
                deferred.resolve();
            }, function(response) {
                deferred.reject(response.data.reason);
            });

            return deferred.promise;
        },
        signupNoCaptcha: function(user) {
            var deferred = $q.defer();

            var newUser = new UsersResource(user);
            newUser.$save().then(function() {
                identity.currentUser = newUser;
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
        loginNoCaptcha: function(user){
            var deferred = $q.defer();

            $http.post('/loginNoCaptcha', user).success(function(response) {
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
            });

            return deferred.promise;
        },
        update: function(user) {
            var deferred = $q.defer();
            var updatedUser = new UsersResource(user);
            updatedUser._id = identity.currentUser._id;

            updatedUser.$update().then(function() {
                if(!updatedUser.hasOwnProperty('roles')) {
                    updatedUser.roles = identity.currentUser.roles;
                }
                identity.currentUser = updatedUser;
                deferred.resolve();
            }, function(response) {
                deferred.reject(response.data.reason);
            });

            return deferred.promise;
        },
        addAsAdmin: function(user, library, newLibrary) {
            var deferred = $q.defer();
            var newUser = new UsersResource(user);
            newUser._id = user._id;

            if(library!==undefined) {
                if(newLibrary===true) {
                    // Create new library, create the user and update library's librarians

                    // Create the library
                    var newLibraryResource = new LibraryResource(library);
                    newLibraryResource.$save(function(data) {

                        // Create the user
                        newUser.ownLibraryID = data._id;
                        newUser.$save(function(userData) {

                            // Update the library to hold the user's ID as a librarian
                            library.librarians = userData._id;
                            var updatedLibrary = new LibraryResource(library);
                            updatedLibrary._id = userData.ownLibraryID;

                            updatedLibrary.$update().then(function() {
                                deferred.resolve();
                            }, function(response) {
                                deferred.reject(response.data.reason);
                            });

                        }, function(response) {
                            deferred.reject(response.data.reason);
                        });
                    }, function(response) {
                        deferred.reject(response.data.reason);
                    });
                    return deferred.promise;
                } else {
                    // Create the user and then update the library to hold user's ID as a librarian

                    newUser.$save(function(data) {
                        // Push user's ID in library's librarians' array
                        library.librarians.push(data._id);
                        var updatedLibrary = new LibraryResource(library);

                        updatedLibrary.$update(function(data) {

                            // Update the user so that he holds library's ID
                            newUser.ownLibraryID = data._id;
                            newUser.$update().then(function() {
                                deferred.resolve();
                            }, function(response) {
                                deferred.reject(response.data.reason);
                            });

                        }, function(response) {
                            deferred.reject(response.data.reason);
                        });
                    }, function(response) {
                        deferred.reject(response.data.reason);
                    });

                    return deferred.promise;
                }
            } else {
                // Simply update the user if he's not a librarian

                newUser.$save().then(function() {
                    deferred.resolve();
                }, function(response) {
                    deferred.reject(response.data.reason);
                });
                return deferred.promise;
            }


        },
        updateAsAdmin: function(user, library, newLibrary) {
            var deferred = $q.defer();

            if(identity.currentUser.hasOwnProperty('roles') && identity.currentUser.roles.indexOf('admin')>-1) {

                var updatedUser = new UsersResource(user);
                updatedUser._id = user._id;
                if(library!==undefined) {
                    if(newLibrary===true) {
                        // Create new library and update the user after that

                        var newLibraryResource = new LibraryResource(library);
                        newLibraryResource.$save(function(data) {
                            updatedUser.ownLibraryID = data._id;
                            updatedUser.$update().then(function() {
                                if(!updatedUser.hasOwnProperty('roles')) {
                                    updatedUser.roles = identity.currentUser.roles;
                                }
                                deferred.resolve();
                            }, function(response) {
                                deferred.reject(response.data.reason);
                            });
                        });
                        return deferred.promise;
                    } else {
                        // Update existing library and the user after that

                        if(library.librarians!==undefined && library.librarians.indexOf(user._id)===-1) {
                            library.librarians.push(user._id);
                        }
                        var updatedLibrary = new LibraryResource(library);
                        updatedLibrary._id = library._id;

                        // Update the library
                        updatedLibrary.$update(function(data) {

                            // Update the user so that he holds library's ID
                            updatedUser.ownLibraryID = data._id;
                            updatedUser.$update().then(function() {
                                deferred.resolve();
                            }, function(response) {
                                deferred.reject(response.data.reason);
                            });
                        });
                        return deferred.promise;
                    }
                } else {
                    // Simply update the user if he's not a librarian

                    updatedUser.$update().then(function() {
                        deferred.resolve();
                    }, function(response) {
                        deferred.reject(response.data.reason);
                    });
                    return deferred.promise;
                }
            } else {
                deferred.reject('You are not authorized for this action!');
            }
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
        }
    };
});