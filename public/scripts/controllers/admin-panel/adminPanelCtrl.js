'use strict';

app.controller('AdminPanelCtrl', function($scope, $location, identity) {
	$scope.identity = identity;
	$scope.path = $location.path();

	// Gets the current menu item
	// using the current location path
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

	$scope.menu = [

		{
			'name' : 'libraries',
			links : {
				'add' : '/admin/libraries/add',
				'browse' : '/admin/libraries',
				'search' : '/admin/libraries/search'
			}
		},

		{
			'name' : 'books',
			links : {
				'add' : '/admin/books/add',
				'browse' : '/admin/books',
				'search' : '/admin/books/search-library'
			}
		},

		{
			'name' : 'users',
			links : {
				'add' : '/admin/users/add',
				'browse' : '/admin/users',
				'search' : '/admin/users/search'
			}
		}
	]

});
