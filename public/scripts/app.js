'use strict';

var app = angular.module('app', ['ngResource', 'ngRoute', 'reCAPTCHA', 'nya.bootstrap.select']).value('toastr', toastr);

app.run(function($rootScope, $location) {
	
	// handling authorization errors
	$rootScope.$on('$routeChangeError', function(ev, current, previous, rejection) {
		if (rejection === 'not authorized') {
			$location.path('/404');
		}
	});
});
