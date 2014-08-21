app.controller('LibraryDeleteCtrl', function($scope, $routeParams, $http, $location, notifier) {
    
    $http.get("/api/library/delete/"+$routeParams.id).success(function(data){
		notifier.success("The library has been successfully deleted.");
	});
	
	$location.path("/admin/libraries");

});
