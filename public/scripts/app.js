'use strict';

var app = angular.module('app', ['ngResource', 'ngRoute', 'reCAPTCHA']).value('toastr', toastr);

app.config(function($routeProvider, $locationProvider, reCAPTCHAProvider) {
	 
    // remove # from urls
    $locationProvider.html5Mode(true);
     
    reCAPTCHAProvider.setPublicKey('6Lcy4csSAAAAAFdcvcxawMgzlJCabD0G5bk5lp2U');
    reCAPTCHAProvider.setOptions({
	   theme: 'clean'
    });

    // router authorization checker for roles
    var routeUserChecks = {
        adminRole: {
            authenticate: function(auth) {
                return auth.isAuthorizedForRole('admin');
            }
        },
        authenticated: {
            authenticate: function(auth) {
                return auth.isAuthenticated();
            }
        }
    };

    // set routes using angular's ngRoute
    $routeProvider
        .when('/', {
            templateUrl: '/partials/main/home',
            controller: 'MainCtrl'
        })
        .when('/libraries', {
            templateUrl: '/partials/libraries/libraries-list',
            controller: 'LibrariesListCtrl'
        })
        .when('/libraries/:id', {
            templateUrl: '/partials/libraries/library-details',
            controller: 'LibraryDetailsCtrl'
        })

        // Profile

        .when('/signup', {
            templateUrl: '/partials/account/sign-up',
            controller: 'SignUpCtrl'
        })
        .when('/login', {
            templateUrl: '/partials/account/log-in',
            controller: 'SignUpCtrl'
        })
        .when('/profile', {
            templateUrl: '/partials/account/profile',
            controller: 'ProfileCtrl',
            resolve: routeUserChecks.authenticated
        })
        .when('/profile/edit', {
            templateUrl: '/partials/account/edit-profile',
            controller: 'EditProfileCtrl',
            resolve: routeUserChecks.authenticated
        })


        // Administration

        .when('/admin', {
            templateUrl: '/partials/admin/panel',
            controller: 'AdminPanelCtrl',
            resolve: routeUserChecks.adminRole
        })

        // Users
        
        .when('/admin/users', {
            templateUrl: '/partials/admin/users-list',
            controller: 'UserListCtrl',
            resolve: routeUserChecks.adminRole
        })
        .when('/admin/user/:id', {
            templateUrl: '/partials/admin/users-info',
            controller: 'UserInfoCtrl',
            resolve: routeUserChecks.adminRole
        })
        .when('/admin/user/edit/:id', {
            templateUrl: '/partials/admin/user-edit',
            controller: 'editProfileAdminCtrl',
            resolve: routeUserChecks.adminRole
        })
        .when('/admin/user/delete/:id', {
            templateUrl: '/partials/admin/user-delete',
            controller: 'UserDeleteCtrl',
            resolve: routeUserChecks.adminRole
        })

        // Libraries

        .when('/admin/libraries', {
            templateUrl: '/partials/admin/libraries-list',
            controller: 'LibraryListCtrl',
            resolve: routeUserChecks.adminRole
        })
        .when('/admin/library/:id', {
            templateUrl: '/partials/admin/libraries-info',
            controller: 'LibraryInfoCtrl',
            resolve: routeUserChecks.adminRole
        })
        .when('/admin/library/edit/:id', {
            templateUrl: '/partials/admin/library-edit',
            controller: 'editLibraryAdminCtrl',
            resolve: routeUserChecks.adminRole
        })
        .when('/admin/library/delete/:id', {
            templateUrl: '/partials/admin/library-delete',
            controller: 'LibraryDeleteCtrl',
            resolve: routeUserChecks.adminRole
        })
        .when('/admin/books', {
            templateUrl: '/partials/admin/books-list',
            controller: 'BookListCtrl',
            resolve: routeUserChecks.adminRole
        })
        .when('/admin/book/:id', {
            templateUrl: '/partials/admin/books-info',
            controller: 'BookInfoCtrl',
            resolve: routeUserChecks.adminRole
        })
        .when('/admin/books/add', {
            templateUrl: '/partials/admin/book-add',
            controller: 'AddBookCtrl',
            resolve: routeUserChecks.adminRole
        })
        .when('/admin/book/edit/:id', {
            templateUrl: '/partials/admin/book-edit',
            controller: 'editBookAdminCtrl',
            resolve: routeUserChecks.adminRole
        })
        .when('/admin/book/delete/:id', {
            templateUrl: '/partials/admin/book-delete',
            controller: 'BookDeleteCtrl',
            resolve: routeUserChecks.adminRole
        });
        
});

app.run(function($rootScope, $location) {

    // handling authorization errors
    $rootScope.$on('$routeChangeError', function(ev, current, previous, rejection) {
        if (rejection === 'not authorized') {
            $location.path('/');
        }
    });
});
