'use strict';

app.directive('selectPicker', function () {
    return {
        restrict: 'A',
        link: function ($scope, $elem) {
            $scope.$watch('books', function(){
                $elem.selectpicker('refresh');
            });
     
        }
    };
});
