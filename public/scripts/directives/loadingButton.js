'use strict';

app.directive('loadingButton', function () {
    return {
        restrict: 'A',
        link: function ($scope, $elem) {
        				
			$elem.click(function () {
			    $elem.button('loading');
			});
			
			$scope.$watch('user.avatar', function(){
				$elem.button('reset');
			});

			$scope.$watch('searchState', function(){
				$elem.button('reset');
			});
			
			$scope.$watch('library.certificate', function(){
				$elem.button('reset');
			});

			$scope.$watch('book.cover', function(){
				$elem.button('reset');
			});
			
			$scope.$watch('avatarError', function(){
				$elem.button('reset');
				$scope.avatarError = '';
			});
			
			$scope.$watch('certificateError', function(){
				$elem.button('reset');
				$scope.certificateError = '';
			});

			$scope.$watch('coverError', function(){
				$elem.button('reset');
				$scope.coverError = '';
			});
     
        }
    };
});
