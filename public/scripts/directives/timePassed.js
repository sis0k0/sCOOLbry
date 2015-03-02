'use strict';

app.directive('timePassed', function () {

    var timeToText = function(secondsPassed) {
        switch(true) {
            case secondsPassed<60:
                return 'less than a minute ago';
            case secondsPassed<120:
                return 'a minute ago';
            case secondsPassed<3600:
                return Math.floor(secondsPassed/60) + ' minutes ago';
            case secondsPassed<7200:
                return 'an hour ago';
            case secondsPassed<86400:
                return Math.floor(secondsPassed/3600) + ' hours ago';
            case secondsPassed<172800:
                return 'Yesterday';
            case secondsPassed<2592000:
                return Math.floor(secondsPassed/86400) + ' days ago';
            case secondsPassed<5184000:
                return 'a month ago';
            case secondsPassed<311040000:
                return Math.floor(secondsPassed/2592000) + ' months ago';
            case secondsPassed<622080000:
                return 'an year ago';
            default:
                return Math.floor(secondsPassed/311040000) + ' years ago';
        }
    };

    var getSecondsPassed = function(notificationDate) {
        var now = new Date();
        var secondsPassed = (now - notificationDate)/1000;
        return secondsPassed;
    };

    return {
        restrict: 'A',
        transclude: true,
        link: function (scope, element) {

            var notificationDate = new Date(scope.notification.date);
            var seconds = getSecondsPassed(notificationDate);
            var text = timeToText(seconds);

            element.text(text);
        }
    };
});
