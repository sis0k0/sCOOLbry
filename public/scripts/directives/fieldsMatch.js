'use strict';

app.directive('fieldsMatch', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, elem, attrs, ctrl) {

            var fieldsMatch = function(first, second) {
                var validity = (first === second) ? true : false;
                ctrl.$setValidity('fieldsMatch', validity);
            };

            var firstPreviousValue,
                secondPreviousValue;

            scope.$watch(attrs.ngModel, function(newValue) {
                firstPreviousValue = newValue;
                if(!!secondPreviousValue) {
                    fieldsMatch(newValue, secondPreviousValue);
                }
            });
            scope.$watch(attrs.fieldsMatch, function(newValue) {
                secondPreviousValue = newValue;
                if(!!firstPreviousValue) {
                    fieldsMatch(newValue, firstPreviousValue);
                }
            });
        }
    };
});
