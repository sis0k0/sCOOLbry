'use strict';

app.directive('resize', function ($window) {
    return function (scope) {
        var w = angular.element($window);


        scope.getWindowDimensions = function () {
            return {
                'h': w.height(),
                'w': w.width()
            };
        };

        scope.$watch(scope.getWindowDimensions, function (newValue) {
            scope.windowHeight = newValue.h;
            scope.windowWidth = newValue.w;


            // Handles the different behaviour of the navbar in different screen width
            if(scope.windowWidth<768){
                scope.dataToggle = 'collapse';
                scope.dataTarget = '.navbar-inverse-collapse';
            }else{
                scope.dataToggle = '';
                scope.dataTarget = '';
            }

        }, true);

        w.bind('resize', function () {
            scope.$apply();
        });
    };
});