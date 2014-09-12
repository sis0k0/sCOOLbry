'use strict';

app.controller('UserDeleteFromLibraryCtrl', function($scope, $routeParams, $http, $location, notifier) {
    
    $http.get('/api/library/delete-user/' + $routeParams.id).success(function(){
		notifier.success('The user has been successfully unsubscribed from the library.');
	});
	$location.path('/libraryPanel/users');

});
