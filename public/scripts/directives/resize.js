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
        }, true);

        w.bind('resize', function () {
            scope.$apply();
        });
    };
});