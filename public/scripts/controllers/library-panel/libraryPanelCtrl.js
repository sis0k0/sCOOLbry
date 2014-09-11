'use strict';

app.controller('LibraryPanelCtrl', function($scope, identity, $location) {
    $scope.identity = identity;
	$scope.path = $location.path();

	$scope.getMenuItem = function(path) {
		var menuItem = path.substr(1, path.length);

		var indexOfNextSlash = menuItem.indexOf('/');
		if(indexOfNextSlash === -1) {
			return '';
		}
		menuItem = menuItem.substring(indexOfNextSlash+1, menuItem.length);

		indexOfNextSlash = menuItem.indexOf('/');
		if(indexOfNextSlash === -1) {
			indexOfNextSlash = menuItem.length;
		}
		menuItem = menuItem.substring(0, indexOfNextSlash);

		return menuItem;
	}


	$scope.menuItem = $scope.getMenuItem($scope.path);
	$scope.singleMenuItem = $scope.menuItem.substring(1, $scope.menuItem.length);

	$scope.menu = [

		{
			'name' : 'library',
			links : {
				'Details' : '/libraryPanel/library-details',
			}
		},

		{
			'name' : 'books',
			links : {
				'add' : '/libraryPanel/books/add',
				'browse' : '/libraryPanel/books-library',
				'search' : '/libraryPanel/books/search-library'
			}
		},

		{
			'name' : 'users',
			links : {
				'add' : '/libraryPanel/users/add-user',
				'browse' : '/libraryPanel/users',
				'search' : '/libraryPanel/users/search',
				'book requests' : '/libraryPanel/users/book-requests',
				'user interaction' : '/libraryPanel/users/user-interaction',
			}
		}
	]
});
