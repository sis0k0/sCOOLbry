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
			resolve: {
				lazy: ['$ocLazyLoad', function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'account',
						files: ['scripts/controllers/account/signUpCtrl.js']
					}]);
				}]
			}
		})
		.when('/login', {
			templateUrl: '/partials/account/log-in',
			resolve: {
				lazy: ['$ocLazyLoad', function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'account',
						files: ['scripts/controllers/account/logInCtrl.js']
					}]);
				}]
			}
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