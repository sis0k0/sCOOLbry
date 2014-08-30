'use strict';

app.directive('selectPicker', function () {
    return {
        restrict: 'A',
        link: function ($scope, $elem) {

        	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
			    $elem.selectpicker('mobile');
			}else{
	            $elem.selectpicker({
			      size: 5
			  	});
        	}
        }
    };
});