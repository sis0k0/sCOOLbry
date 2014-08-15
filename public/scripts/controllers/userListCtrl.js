app.controller('UserListCtrl', function($scope, UsersResource) {
    $scope.users = UsersResource.query();

    
    // infinite scroller

    $scope.limitStep = 5;

    $scope.totalDisplayed = $scope.limitStep;

	$scope.loadMore = function () {
	  $scope.totalDisplayed += $scope.limitStep; 
	};

	$scope.loadAll = function() {
		$scope.totalDisplayed = $scope.users.length;
	}

});
