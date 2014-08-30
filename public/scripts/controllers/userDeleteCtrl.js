'use strict';

app.controller('UserDeleteCtrl', function($scope, $routeParams, $http, $location, notifier) {
    
    $http.get('/api/user/delete/' + $routeParams.id).success(function(){
		notifier.success('The user has been successfully deleted.');
	});
	
	$location.path('/admin/users');

});
