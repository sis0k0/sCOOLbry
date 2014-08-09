var app = angular.module('app', ['ngResource', 'ngRoute', 'reCAPTCHA']).value('toastr', toastr);

app.config(function($routeProvider, $locationProvider, reCAPTCHAProvider) {
	 
    // remove # from urls
    $locationProvider.html5Mode(true);
     
    reCAPTCHAProvider.setPublicKey('6Lcy4csSAAAAAFdcvcxawMgzlJCabD0G5bk5lp2U');
    reCAPTCHAProvider.setOptions({
	   theme: 'clean'
    });

    // router authorization checker for roles
    var routeUserChecks = {
        adminRole: {
            authenticate: function(auth) {
                return auth.isAuthorizedForRole('admin');
            }
        },
        authenticated: {
            authenticate: function(auth) {
                return auth.isAuthenticated();
            }
        }
    };

    // set routes using angular's ngRoute
    $routeProvider
        .when('/', {
            templateUrl: '/partials/main/home',
            controller: 'MainCtrl'
        })
        .when('/courses', {
            templateUrl: '/partials/courses/courses-list',
            controller: 'CoursesListCtrl'
        })
        .when('/courses/:id', {
            templateUrl: '/partials/courses/course-details',
            controller: 'CourseDetailsCtrl'
        })
        .when('/signup', {
            templateUrl: '/partials/account/signup',
            controller: 'SignUpCtrl'
        })
        .when('/login', {
            templateUrl: '/partials/account/login',
            controller: 'SignUpCtrl'
        })
        .when('/profile', {
            templateUrl: '/partials/account/profile',
            controller: 'ProfileCtrl',
            resolve: routeUserChecks.authenticated
        })
        .when('/profile/edit', {
            templateUrl: '/partials/account/editProfile',
            controller: 'EditProfileCtrl',
            resolve: routeUserChecks.authenticated
        })
        .when('/admin/users', {
            templateUrl: '/partials/admin/users-list',
            controller: 'UserListCtrl',
            resolve: routeUserChecks.adminRole
        })
        
        
});

app.run(function($rootScope, $location) {

    // handling authorization errors
    $rootScope.$on('$routeChangeError', function(ev, current, previous, rejection) {
        if (rejection === 'not authorized') {
            $location.path('/');
        }
    })
});
