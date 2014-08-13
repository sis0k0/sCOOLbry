app.directive('resize', function ($window) {
    return function (scope, element) {
        var w = angular.element($window);


        scope.getWindowDimensions = function () {
            return {
                'h': w.innerHeight(),
                'w': w.innerWidth()
            };
        };

        scope.$watch(scope.getWindowDimensions, function (newValue, oldValue) {
            scope.windowHeight = newValue.h;
            scope.windowWidth = newValue.w;


            // Handles the different behaviour of the navbar in different screen width
            if(scope.windowWidth<750){
                scope.dataToggle = "collapse";
                scope.dataTarget = ".navbar-inverse-collapse";
            }else{
                scope.dataToggle = "";
                scope.dataTarget = "";
            }

        }, true);

        w.bind('resize', function () {
            scope.$apply();
        });
    }
})