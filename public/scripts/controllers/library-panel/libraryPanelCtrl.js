'use strict';

app.controller('LibraryPanelCtrl', function($scope, identity, $location) {
    $scope.identity = identity;
	$scope.path = $location.path();

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
				'add' : '/libraryPanel/users/add',
				'browse' : '/libraryPanel/users',
				'search' : '/libraryPanel/users/search',
				'book requests' : '/libraryPanel/users/book-requests',
				'user interaction' : '/libraryPanel/users/user-interaction',
			}
		}
	]


	// Gets the current menu item
	// using the current location path
	$scope.getCurrentMenuItem = function(path) {
		for(var i=0; i<$scope.menu.length; i++) {
			for (var key in $scope.menu[i].links) {
				if($scope.menu[i].links[key]===path){
					return $scope.menu[i].name;
				}
			}
		}
		return '';
	};

	$scope.currentMenuItem = $scope.getCurrentMenuItem($scope.path);

});
