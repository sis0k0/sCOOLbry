'use strict';


var app = angular.module('app', [
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'reCAPTCHA',
    'nya.bootstrap.select',
    'timer',
    'oc.lazyLoad',
    'ui.select',
    'ui.bootstrap',
]).value('toastr', toastr);

app.run(function($rootScope, $location) {
    
    // handling authorization errors
    $rootScope.$on('$routeChangeError', function(ev, current, previous, rejection) {
        if (rejection === 'not authorized') {
            $location.path('/404');
        }
    });
});