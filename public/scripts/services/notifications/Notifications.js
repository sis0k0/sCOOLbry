'use strict';

app.factory('Notification', function($http, $q, NotificationResource) {
    return {
        getForUser: function(user) {
            var deferred = $q.defer();
            $http.get('/api/notifications/' + user._id).
            success(function(notifications) {
                deferred.resolve(notifications);

            }).
            error(function(err) {
                console.log(err);
                deferred.resolve([]);
            });

            return deferred.promise;
        },
        markAsSeen: function(notification) {
            var deferred = $q.defer();
            var seenNotification = new NotificationResource(notification);

            seenNotification.$delete().then(function() {
                deferred.resolve(true);
            }, function(reason) {
                deferred.reject(reason.data.reason);
            });

            return deferred.promise;            
        }
    };
});