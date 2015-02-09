'use strict';

app.factory('LibraryUsersInteractions', function($q, BookGiveResource, BookReturnResource, BookingResource) {
    return {
        giveBook: function(interaction) {
            var deferred = $q.defer();
            
            var newReading = new BookGiveResource(interaction);
            newReading.$save().then(function() {
                deferred.resolve();
            }, function(response) {
                
                deferred.reject(response);
            });

            return deferred.promise;
        },
        returnBook: function(interaction) {
            var deferred = $q.defer();
            
            var newReading = new BookReturnResource(interaction);
            newReading.$save().then(function() {
                deferred.resolve();
            }, function(response) {
                
                deferred.reject(response);
            });

            return deferred.promise;
        },
        addBooking: function(booking){
            var deferred = $q.defer();
            
            var newBooking = new BookingResource(booking);
            newBooking.$save().then(function() {
                deferred.resolve();
            }, function(response) {
                
                deferred.reject(response);
            });

            return deferred.promise;
        },
         removeBooking: function(booking){
             var deferred = $q.defer();
             
             var bookingToRemove = new BookingResource({id: booking._id});
             bookingToRemove.$remove().then(function() {
                 deferred.resolve();
             }, function(response) {
                 deferred.reject(response);
             });
             return deferred.promise;
         }
    };
});
