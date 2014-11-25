'use strict';

app.controller('LibraryBookDeleteCtrl', function($scope, $routeParams, $http, $location, notifier) {
    
    $http.get('/api/book/delete2/' + $routeParams.id).success(function(){
		notifier.success('The book has been successfully deleted.');
	});
	$location.path('/library-panel/books-library');

});
