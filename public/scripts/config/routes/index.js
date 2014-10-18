'use strict';

app.config(function($routeProvider) {


	// router authorization checker for roles
	var routeUserChecks = {
		adminRole: {
			authenticate: function(auth) {
				return auth.isAuthorizedForRole('admin');
			}
		},
		librarianRole: {
			authenticate: function(auth) {
				return auth.isAuthorizedForRole('librarian');
			}
		},
		libraryOwnerRole: {
			authenticate: function(auth) {
				return auth.isAuthorizedForRole('libraryOwner');
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


		// 404 Page not found
		.when('/404', {
			templateUrl: '/partials/account/log-in' // Development mode for easier testing
		})
		.otherwise({
			redirectTo: '/404'
		});

});
