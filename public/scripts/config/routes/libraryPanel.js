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

		//Library Panel
		.when('/library-panel', {
			templateUrl: '/partials/library-panel/settings',
            controller: 'LibraryPanelCtrl',
			resolve: routeUserChecks.librarianRole
		})

		// Library settings
		.when('/library-panel/library-details', {
			templateUrl: '/partials/library-panel/settings/library-details',
            controller: 'LibrarySettingsCtrl',
			resolve: routeUserChecks.librarianRole
		})

		// Books
		.when('/library-panel/books/add', {
			templateUrl: '/partials/library-panel/books/book-add',
            controller: 'LibraryAddBookCtrl',
			resolve: routeUserChecks.librarianRole
		})
		.when('/library-panel/bookInfo/:id', {
			templateUrl: '/partials/library-panel/books/books-info',
            controller: 'BookInfoLibCtrl',
			resolve: routeUserChecks.librarianRole
		})
		.when('/library-panel/books-library', {
			templateUrl: '/partials/library-panel/books/books-list',
            controller: 'LibraryBooksListCtrl',
			resolve: routeUserChecks.librarianRole
		})
		.when('/library-panel/books/search', {
			templateUrl: '/partials/library-panel/books/books-search',
            controller: 'LibraryBooksSearchCtrl',
			resolve: routeUserChecks.librarianRole
		})
		.when('/library-panel/book/edit/:id', {
			templateUrl: '/partials/library-panel/books/book-edit',
            controller: 'EditBookLibraryCtrl',
			resolve: routeUserChecks.librarianRole
		})
		.when('/library-panel/book/delete/:id', {
			templateUrl: '/partials/library-panel/books/book-delete',
            controller: 'LibraryBookDeleteCtrl',
			resolve: routeUserChecks.librarianRole
		})

		// Users
        .when('/library-panel/users', {
			templateUrl: '/partials/library-panel/users/users-list',
            controller: 'LibraryUsersCtrl',
			resolve: routeUserChecks.librarianRole
		})
        .when('/library-panel/users/add', {
			templateUrl: '/partials/library-panel/users/user-add',
            controller: 'AddUserToLibraryCtrl',
			resolve: routeUserChecks.librarianRole
		})
        .when('/library-panel/userInfo/:id', {
			templateUrl: '/partials/library-panel/users/user-info',
            controller: 'UserInfoLibraryCtrl',
			resolve: routeUserChecks.librarianRole
		})
        .when('/library-panel/user/interact/:id', {
			templateUrl: '/partials/library-panel/users/user-interact',
            controller: 'UserInteractLibraryCtrl',
			resolve: routeUserChecks.librarianRole
		})
        .when('/library-panel/user/delete/:id', {
			templateUrl: '/partials/library-panel/users/user-delete',
            controller: 'UserDeleteFromLibraryCtrl',
			resolve: routeUserChecks.librarianRole
		})
		.when('/library-panel/users/book-requests', {
			templateUrl: '/partials/library-panel/users/book-requests',
            controller: 'BookingRequestsCtrl',
			resolve: routeUserChecks.librarianRole
		})
});