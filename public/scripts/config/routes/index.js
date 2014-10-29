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

		// Homepage
		.when('/', {
			templateUrl: '/partials/main/home',
			controller: 'MainCtrl'
		})

		// Libraries

		.when('/libraries', {
			templateUrl: '/partials/libraries/libraries-list',
			controller: 'LibrariesListCtrl'
		})
		.when('/libraries/:id', {
			templateUrl: '/partials/libraries/library-details',
			controller: 'LibraryDetailsPageCtrl'
		})
		.when('/book/:id', {
			templateUrl: '/partials/books/book-details',
			controller: 'BookDetailsCtrl'
		})
		.when('/book/:id/:libraryID', {
			templateUrl: '/partials/books/book-details',
			controller: 'BookDetailsCtrl'
		})


		// 404 Page not found
		.when('/404', {
			templateUrl: '/partials/account/log-in' // Development mode for easier testing
		})
		.otherwise({
			redirectTo: '/404'
		});

});
