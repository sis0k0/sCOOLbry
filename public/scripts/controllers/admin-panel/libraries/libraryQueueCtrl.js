'use strict';

app.controller('LibraryQueueCtrl', function($scope, LibraryResourceSortable, $routeParams, $http) {
	
    $scope.page = 1;
    $scope.perPage = 10;
    $scope.field = 'published';
    $scope.order = 'desc';
    
    $scope.range = function(n) {
        return new Array(n);
    };
    

	$scope.pages = function(){
		$http.get('/api/library/count').success(function(data){
			$scope.librariesCount = parseInt(data);
			$scope.pagesCount = Math.ceil($scope.librariesCount/$scope.perPage);
			
		});
	};
	
    
    $scope.libraries = LibraryResourceSortable.query({
    	field: $scope.field,
    	order: $scope.order,
    	page: $scope.page,
    	perPage: $scope.perPage
    });

    for(var i=0; i<$scope.libraries.length; i++) {
    	if($scope.libraries[i].certified === true) {
    		$scope.libraries.split(i,1);
    	}
    }
	
	
	$scope.setPage = function(page, event){
		
		$scope.page = page;
		angular.element('.pagination li').removeClass('active');
		angular.element('#'+event.target.id).parent().addClass('active');
	};
	
	$scope.setPerPage = function(perPage){
		$scope.perPage = perPage;
	};
	
	
	$scope.sort = function(event){
		$scope.field = event.target.id;
		$scope.order = ($scope.order==='asc') ? $scope.order='desc' : $scope.order='asc';
	};
	
	$scope.reloadLibraries = function(){
		$scope.libraries = LibraryResourceSortable.query({
			field: $scope.field,
			order: $scope.order,
			page: $scope.page,
			perPage: $scope.perPage
		});
		
	};
});
