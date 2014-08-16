app.directive('loadingButton', function () {
    return {
        restrict: 'A',
        link: function ($scope, $elem, attrs) {
			$elem.click(function () {
			    $elem.button('loading')

		     //    $.ajax(...).always(function () {
			    //   btn.button('reset')
			    // });

			});
        }
    }
});