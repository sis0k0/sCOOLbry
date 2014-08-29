app.controller('BookInfoCtrl', function($scope, BookResource, $routeParams) {

    $scope.bookInfo = BookResource.get({id: $routeParams.id}, function(data){
	
	});
   
});
