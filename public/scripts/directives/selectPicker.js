'use strict';

app.directive('selectPicker',
        [
            '$timeout',
            function($timeout) {
                return {
                    restrict: 'A',
                    require: ['?ngModel', '?ngCollection'],
                    compile: function(tElement, tAttrs) {
                        console.log('init bootstrap-select');
                        tElement.selectpicker();

                        if (angular.isUndefined(tAttrs.ngModel)) {
                            throw new Error('Please add ng-model attribute!');
                        } else if (angular.isUndefined(tAttrs.ngCollection)) {
                            throw new Error('Please add ng-collection attribute!');
                        }

                        return function(scope, element, attrs, ngModel) {
                            if (angular.isUndefined(ngModel)){
                                return;
                            }

                            scope.$watch(attrs.ngModel, function(newVal, oldVal) {
                                if (newVal !== oldVal) {
                                    $timeout(function() {
                                        console.log('value selected');
                                        element.selectpicker('val', element.val());
                                    });
                                }
                            });

                            scope.$watch(attrs.ngCollection, function(newVal, oldVal) {
                                if (newVal && newVal !== oldVal) {
                                    $timeout(function() {
                                        console.log('select collection updated');
                                        element.selectpicker('refresh');
                                    });
                                }
                            });

                            ngModel.$render = function() {
                                element.selectpicker('val', ngModel.$viewValue || '');
                            };

                            ngModel.$viewValue = element.val();
                        };
                    }
                };
            }
        ]
    );