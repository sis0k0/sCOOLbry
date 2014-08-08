app.directive('tooltip', function () {
    return {
        restrict: 'A',
        link: function ($scope, $elem, attrs) {
            $elem.tooltip();
        }
    }
});