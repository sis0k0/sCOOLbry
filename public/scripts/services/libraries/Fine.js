'use strict';

app.factory('Fine', function($q, LibFineResource) {
    return {
        add: function(fine) {
            var deferred = $q.defer();
        
            var newFine = new LibFineResource(fine);
            newFine.$save().then(function() {

                deferred.resolve();

            }, function(response) {

                deferred.reject(response);

            });

            return deferred.promise;
        }
    };
});
