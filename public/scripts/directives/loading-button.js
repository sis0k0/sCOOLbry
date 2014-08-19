app.directive('loadingButton', function () {
    return {
        restrict: 'A',
        link: function ($scope, $elem, attrs) {
			
			$elem.click(function () {
			    $elem.button('loading');
			});
			
			$scope.$watch("user.avatar", function(){
				$elem.button("reset");
			});
			
			$scope.$watch("avatarError", function(){
				$elem.button("reset");
				$scope.avatarError = "";
			});
     
        }
    }
});
