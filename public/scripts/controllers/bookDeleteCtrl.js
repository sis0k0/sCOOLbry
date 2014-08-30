'use strict';

app.controller('BookDeleteCtrl', function($scope, $routeParams, $http, $location, notifier) {
    
    $http.get('/api/book/delete/' + $routeParams.id).success(function(data){
		notifier.success('The book has been successfully deleted.');
	});
	
	$location.path('/admin/books');

});
