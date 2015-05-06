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
    'btford.socket-io',
    'uiGmapgoogle-maps',
])
    .value('toastr', toastr)
    .config(function(uiGmapGoogleMapApiProvider) {
        uiGmapGoogleMapApiProvider.configure({
            v: '3.18',
            libraries: 'geometry,visualization'
        });
    });

app.run(function($rootScope, $location) {
    
    // handling authorization errors
    $rootScope.$on('$routeChangeError', function(ev, current, previous, rejection) {
        if (rejection === 'not authorized') {
            $location.path('/404');
        }
    });
});