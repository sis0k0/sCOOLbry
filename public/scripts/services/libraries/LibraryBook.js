'use strict';

app.factory('LibraryBook', function($q, LibBookResource2, BookAvailabilitySubscriptionResource) {
    return {

        add: function(book) {
            var deferred = $q.defer(),
                updatedBook = new LibBookResource2(book);

            updatedBook.$save().then(function() {
                deferred.resolve();
            }, function(response) {
                deferred.reject(response);
            });

            return deferred.promise;

        },

        update: function(book) {
            var deferred = $q.defer();
            var updatedBook = new LibBookResource2(book);
            updatedBook._id = book._id;
            updatedBook.$update().then(function() {
                deferred.resolve();
            }, function(response) {
                deferred.reject(response);
            });

            return deferred.promise;
        },

        subscribeForAvailabilityNotification: function(subscription) {
            var deferred = $q.defer();
            var newSubscription = new BookAvailabilitySubscriptionResource(subscription);
            newSubscription.$save().then(function() {
                deferred.resolve();
            }, function(response) {
                deferred.reject(response);
            });
            return deferred.promise;
        }


    };
});