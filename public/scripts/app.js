'use strict';

var account = angular.module('account', ['ngResource', 'ngRoute', 'reCAPTCHA', 'nya.bootstrap.select']).value('toastr', toastr);

account.run(function($rootScope, $location) {
	
	// handling authorization errors
	$rootScope.$on('$routeChangeError', function(ev, current, previous, rejection) {
		if (rejection === 'not authorized') {
			$location.path('/404');
		}
	});
});



var app = angular.module('app', ['account', 'ngResource', 'ngRoute', 'reCAPTCHA', 'nya.bootstrap.select', 'oc.lazyLoad']).value('toastr', toastr);

app.run(function($rootScope, $location) {
	
	// handling authorization errors
	$rootScope.$on('$routeChangeError', function(ev, current, previous, rejection) {
		if (rejection === 'not authorized') {
			$location.path('/404');
		}
	});
});


