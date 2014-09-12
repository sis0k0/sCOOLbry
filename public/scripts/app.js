'use strict';

var app = angular.module('app', ['ngResource', 'ngRoute', 'reCAPTCHA', 'nya.bootstrap.select']).value('toastr', toastr);

app.config(function($routeProvider, $locationProvider, reCAPTCHAProvider) {
	 
	// remove # from urls
	$locationProvider.html5Mode(true);
	
    // Set reCaptcha
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
			controller: 'LibraryDetailsCtrl'
		})

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

		//Library Panel
		.when('/libraryPanel', {
			templateUrl: '/partials/library-panel/panel',
            controller: 'LibraryPanelCtrl',
			resolve: routeUserChecks.librarianRole
		})
		.when('/libraryPanel/library-details', {
			templateUrl: '/partials/library-panel/library-details',
            controller: 'LibraryDetailsCtrl',
			resolve: routeUserChecks.librarianRole
		})
		.when('/libraryPanel/books/add', {
			templateUrl: '/partials/library-panel/book-add',
            controller: 'LibraryAddBookCtrl',
			resolve: routeUserChecks.librarianRole
		})
		.when('/libraryPanel/bookInfo/:id', {
			templateUrl: '/partials/library-panel/books-info',
            controller: 'BookInfoCtrl',
			resolve: routeUserChecks.librarianRole
		})
		.when('/libraryPanel/books-library', {
			templateUrl: '/partials/library-panel/books-list',
            controller: 'LibraryBooksListCtrl',
			resolve: routeUserChecks.librarianRole
		})
		.when('/libraryPanel/books/search', {
			templateUrl: '/partials/library-panel/books-search',
            controller: 'LibraryBooksSearchCtrl',
			resolve: routeUserChecks.librarianRole
		})
		.when('/libraryPanel/book/edit/:id', {
			templateUrl: '/partials/library-panel/book-edit',
            controller: 'EditBookLibraryCtrl',
			resolve: routeUserChecks.librarianRole
		})
		.when('/libraryPanel/book/delete/:id', {
			templateUrl: '/partials/library-panel/book-delete',
            controller: 'LibraryBookDeleteCtrl',
			resolve: routeUserChecks.librarianRole
		})
        .when('/libraryPanel/users', {
			templateUrl: '/partials/library-panel/users-list',
            controller: 'LibraryUsersCtrl',
			resolve: routeUserChecks.librarianRole
		})
        .when('/libraryPanel/users/add', {
			templateUrl: '/partials/library-panel/add-user',
            controller: 'AddUserToLibraryCtrl',
			resolve: routeUserChecks.librarianRole
		})
        .when('/libraryPanel/userInfo/:id', {
			templateUrl: '/partials/library-panel/user-info',
            controller: 'UserInfoLibraryCtrl',
			resolve: routeUserChecks.librarianRole
		})
        .when('/libraryPanel/user/interact/:id', {
			templateUrl: '/partials/library-panel/user-interact',
            controller: 'UserInteractLibraryCtrl',
			resolve: routeUserChecks.librarianRole
		})
        .when('/libraryPanel/user/delete/:id', {
			templateUrl: '/partials/library-panel/user-delete',
            controller: 'UserDeleteFromLibraryCtrl',
			resolve: routeUserChecks.librarianRole
		})

		// Administration ---------------------------------------------------------

		.when('/admin', {
			templateUrl: '/partials/admin-panel/settings',
			controller: 'AdminPanelCtrl',
			resolve: routeUserChecks.adminRole
		})
		
		// Users
		
		.when('/admin/users', {
			templateUrl: '/partials/admin-panel/users/users-list',
			controller: 'UserListCtrl',
			resolve: routeUserChecks.adminRole
		})
		.when('/admin/user/:id', {
			templateUrl: '/partials/admin-panel/users/users-info',
			controller: 'UserInfoCtrl',
			resolve: routeUserChecks.adminRole
		})
		.when('/admin/user/edit/:id', {
			templateUrl: '/partials/admin-panel/users/user-edit',
			controller: 'editProfileAdminCtrl',
			resolve: routeUserChecks.adminRole
		})
		.when('/admin/user/delete/:id', {
			templateUrl: '/partials/admin-panel/users/user-delete',
			controller: 'UserDeleteCtrl',
			resolve: routeUserChecks.adminRole
		})

		// Libraries

		.when('/admin/libraries', {
			templateUrl: '/partials/admin-panel/libraries/libraries-list',
			controller: 'LibraryListCtrl',
			resolve: routeUserChecks.adminRole
		})
		.when('/admin/libraries/users/:id', {
			templateUrl: '/partials/admin-panel/libraries/library-users',
			controller: 'LibraryUsersCtrl',
			resolve: routeUserChecks.adminRole
		})
		.when('/admin/library/:id', {
			templateUrl: '/partials/admin-panel/libraries/libraries-info',
			controller: 'LibraryInfoCtrl',
			resolve: routeUserChecks.adminRole
		})
		.when('/librarian/library/:id', {
			templateUrl: '/partials/admin-panel/libraries/libraries-info',
			controller: 'LibraryInfoCtrl',
			resolve: routeUserChecks.adminRole
		})
		.when('/admin/library/edit/:id', {
			templateUrl: '/partials/admin-panel/libraries/library-edit',
			controller: 'editLibraryAdminCtrl',
			resolve: routeUserChecks.adminRole
		})
		.when('/admin/library/delete/:id', {
			templateUrl: '/partials/admin-panel/libraries/library-delete',
			controller: 'LibraryDeleteCtrl',
			resolve: routeUserChecks.adminRole
		})

        // Books

		.when('/admin/books', {
			templateUrl: '/partials/admin-panel/books/books-list',
			controller: 'BookListCtrl',
			resolve: routeUserChecks.adminRole
		})
		.when('/admin/book/:id', {
			templateUrl: '/partials/admin-panel/books/books-info',
			controller: 'BookInfoCtrl',
			resolve: routeUserChecks.adminRole
		})
		.when('/admin/books/add', {
			templateUrl: '/partials/admin-panel/books/book-add',
			controller: 'AddBookCtrl',
			resolve: routeUserChecks.adminRole
		})
		.when('/admin/book/edit/:id', {
			templateUrl: '/partials/admin-panel/books/book-edit',
			controller: 'editBookAdminCtrl',
			resolve: routeUserChecks.adminRole
		})
		.when('/admin/book/delete/:id', {
			templateUrl: '/partials/admin-panel/books/book-delete',
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
