'use strict';

app.factory('XLSReaderService', ['$q', '$rootScope',
    function($q, $rootScope) {
        var service = function(data) {
            angular.extend(this, data);
        };

        service.readFile = function(file, readCells, toJSON) {
            var deferred = $q.defer();
            new XLSReader(file, readCells, toJSON, function(data) {
                $rootScope.$apply(function() {
                    deferred.resolve(data);
                });
            });

            return deferred.promise;
        };

        return service;
    }
]);