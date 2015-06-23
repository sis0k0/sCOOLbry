'use strict';


var app = angular.module('app', [
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngCookies',
    'reCAPTCHA',
    'nya.bootstrap.select',
    'timer',
    'ui.select',
    'ui.bootstrap',
    'btford.socket-io'
])
    .value('toastr', toastr);

app.run(function($rootScope, $location) {
    
    // handling authorization errors
    $rootScope.$on('$routeChangeError', function(ev, current, previous, rejection) {
        if (rejection === 'not authorized') {
            $location.path('/404');
        }
    });
});