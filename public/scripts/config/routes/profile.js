'use strict';

app.config(function($routeProvider) {

    // router authorization checker for roles
    var routeUserChecks = {
        adminRole: {
            authenticate: function(User) {
                return User.isAuthorizedForRole('admin');
            }
        },
        librarianRole: {
            authenticate: function(User) {
                return User.isAuthorizedForRole('librarian');
            }
        },
        libraryOwnerRole: {
            authenticate: function(User) {
                return User.isAuthorizedForRole('libraryOwner');
            }
        },
        authenticated: {
            authenticate: function(User) {
                return User.isAuthenticated();
            }
        }
    };

    // set routes using angular's ngRoute
    $routeProvider

        // Profile

        .when('/register-library', {
            templateUrl: '/partials/account/register-library',
            controller: 'RegisterLibraryCtrl'
        })
        .when('/signup', {
            templateUrl: '/partials/account/sign-up',
            // templateUrl: '/partials/account/sign-up-no-captcha',
            controller: 'SignUpCtrl'
        })
        .when('/login', {
            //templateUrl: '/partials/account/log-in',
            templateUrl: '/partials/account/log-in-no-captcha',
            controller: 'LogInCtrl'
        })
        .when('/profile', {
            templateUrl: '/partials/account/profile',
            controller: 'ProfileCtrl',
            resolve: routeUserChecks.authenticated
        })
        .when('/thank-you', {
            templateUrl: '/partials/account/thank-you',
            resolve: routeUserChecks.authenticated
        })
        .when('/profile/edit', {
            templateUrl: '/partials/account/edit-profile',
            controller: 'EditProfileCtrl',
            resolve: routeUserChecks.authenticated
        });
});
