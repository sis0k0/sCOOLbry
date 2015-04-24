'use strict';

app.directive('fallbackSrc', function() {

    var loadingDefault = 'data:image/gif;base64,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';
    return {
        restrict: 'A',
        link: function(scope, element, attr) {
            element[0].src = attr.loadingSrc ? attr.loadingSrc : loadingDefault;
            var img = angular.element('<img />');
            img.src = scope.ngSrc;
            img.on('load', function() {
                element[0].src = img.src;
            });
        }
    };


});

