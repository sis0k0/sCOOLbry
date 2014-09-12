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

		// Profile

		.when('/signup', {
			templateUrl: '/partials/account/sign-up',
			controller: 'SignUpCtrl'
		})
		.when('/login', {
			templateUrl: '/partials/account/log-in',
			controller: 'LogInCtrl'
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

});