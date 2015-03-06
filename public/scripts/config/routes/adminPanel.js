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
    .when('/admin/users/add', {
      templateUrl: '/partials/admin-panel/users/user-add',
      controller: 'AddUserAdminCtrl',
      resolve: routeUserChecks.adminRole
    })
    .when('/admin/user/edit/:id', {
      templateUrl: '/partials/admin-panel/users/user-edit',
      controller: 'EditProfileAdminCtrl',
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
    .when('/admin/libraries/add', {
      templateUrl: '/partials/admin-panel/libraries/library-add',
      controller: 'AddLibraryCtrl',
      resolve: routeUserChecks.adminRole
    })
    .when('/admin/libraries/queue', {
      templateUrl: '/partials/admin-panel/libraries/library-queue',
      controller: 'LibraryQueueCtrl',
      resolve: routeUserChecks.adminRole
    })
    .when('/admin/libraries/add/librarians', {
      templateUrl: '/partials/admin-panel/libraries/library-add-librarians',
      controller: 'AddLibraryCtrl',
      resolve: routeUserChecks.adminRole
    })
    .when('/admin/library/:id', {
      templateUrl: '/partials/admin-panel/libraries/library-info',
      controller: 'LibraryInfoCtrl',
      resolve: routeUserChecks.adminRole
    })
    .when('/admin/library/edit/:id', {
      templateUrl: '/partials/admin-panel/libraries/library-edit',
      controller: 'EditLibraryAdminCtrl',
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
      controller: 'EditBookAdminCtrl',
      resolve: routeUserChecks.adminRole
    })
    .when('/admin/book/delete/:id', {
      templateUrl: '/partials/admin-panel/books/book-delete',
      controller: 'BookDeleteCtrl',
      resolve: routeUserChecks.adminRole
    });
  });