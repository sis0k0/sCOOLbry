'use strict';

app.directive('onFocus', function () {
    return {
      restrict: 'A',
      link: function (scope, element) {
          element.focus();
      }
    };
  });