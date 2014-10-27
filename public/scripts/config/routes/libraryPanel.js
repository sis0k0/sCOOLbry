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

		//Library Panel
		.when('/libraryPanel', {
			templateUrl: '/partials/library-panel/panel',
            controller: 'LibraryPanelCtrl',
			resolve: routeUserChecks.librarianRole
		})

		// Library settings
		.when('/libraryPanel/library-details', {
			templateUrl: '/partials/library-panel/settings/library-details',
            controller: 'LibraryDetailsCtrl',
			resolve: routeUserChecks.librarianRole
		})

		// Books
		.when('/libraryPanel/books/add', {
			templateUrl: '/partials/library-panel/books/book-add',
            controller: 'LibraryAddBookCtrl',
			resolve: routeUserChecks.librarianRole
		})
		.when('/libraryPanel/bookInfo/:id', {
			templateUrl: '/partials/library-panel/books/books-info',
            controller: 'BookInfoCtrl',
			resolve: routeUserChecks.librarianRole
		})
		.when('/libraryPanel/books-library', {
			templateUrl: '/partials/library-panel/books/books-list',
            controller: 'LibraryBooksListCtrl',
			resolve: routeUserChecks.librarianRole
		})
		.when('/libraryPanel/books/search', {
			templateUrl: '/partials/library-panel/books/books-search',
            controller: 'LibraryBooksSearchCtrl',
			resolve: routeUserChecks.librarianRole
		})
		.when('/libraryPanel/book/edit/:id', {
			templateUrl: '/partials/library-panel/books/book-edit',
            controller: 'EditBookLibraryCtrl',
			resolve: routeUserChecks.librarianRole
		})
		.when('/libraryPanel/book/delete/:id', {
			templateUrl: '/partials/library-panel/books/book-delete',
            controller: 'LibraryBookDeleteCtrl',
			resolve: routeUserChecks.librarianRole
		})

		// Users
        .when('/libraryPanel/users', {
			templateUrl: '/partials/library-panel/users/users-list',
            controller: 'LibraryUsersCtrl',
			resolve: routeUserChecks.librarianRole
		})
        .when('/libraryPanel/users/add', {
			templateUrl: '/partials/library-panel/users/user-add',
            controller: 'AddUserToLibraryCtrl',
			resolve: routeUserChecks.librarianRole
		})
        .when('/libraryPanel/userInfo/:id', {
			templateUrl: '/partials/library-panel/users/user-info',
            controller: 'UserInfoLibraryCtrl',
			resolve: routeUserChecks.librarianRole
		})
        .when('/libraryPanel/user/interact/:id', {
			templateUrl: '/partials/library-panel/users/user-interact',
            controller: 'UserInteractLibraryCtrl',
			resolve: routeUserChecks.librarianRole
		})
        .when('/libraryPanel/user/delete/:id', {
			templateUrl: '/partials/library-panel/users/user-delete',
            controller: 'UserDeleteFromLibraryCtrl',
			resolve: routeUserChecks.librarianRole
		})
		.when('/libraryPanel/users/book-requests', {
			templateUrl: '/partials/library-panel/users/book-requests',
            controller: 'BookingRequestsCtrl',
			resolve: routeUserChecks.librarianRole
		})
});