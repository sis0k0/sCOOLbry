'use strict';

app.config(function($routeProvider) {

    // router authorization checker for roles
    // jshint unused:true
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

    // jshint unused:false

    // set routes using angular's ngRoute
    $routeProvider

        // Homepage
        .when('/', {
            templateUrl: '/partials/main/home',
            controller: 'MainCtrl'
        })

        // Libraries

        .when('/catalog', {
            templateUrl: '/partials/catalog/catalog',
            controller: 'CatalogCtrl'
        })
        .when('/libraries', {
            templateUrl: '/partials/libraries/libraries-list',
            controller: 'LibrariesListCtrl'
        })
        .when('/libraries/:id', {
            templateUrl: '/partials/libraries/library-details',
            controller: 'LibraryDetailsCtrl'
        })
        .when('/book/:id', {
            templateUrl: '/partials/books/book-details',
            controller: 'BookDetailsCtrl',
            reloadOnSearch: false
        })
        .when('/book/:id/:libraryID', {
            templateUrl: '/partials/books/book-details',
            controller: 'BookDetailsCtrl',
            reloadOnSearch: false
        })
        .when('/search/:phrase', {
            templateUrl: '/partials/books/book-search',
            controller: 'SearchCtrl'
        })
        .when('/advanced-search', {
            templateUrl: '/partials/search/advanced',
            controller: 'AdvancedSearchCtrl'
        })


        // 404 Page not found
        .when('/404', {
            templateUrl: '/partials/404',
            // templateUrl: '/partials/account/log-in-no-captcha', // Development mode for easier testing
        })
        .otherwise({
            redirectTo: '/404' // If route is not resolved, redirect to 404 page
        });

});
