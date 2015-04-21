'use strict';

app.controller('FineDeleteFromLibraryCtrl', function($scope, $routeParams, $http, $location, notifier) {
    
    $http.get('/api/library/fine-remove/' + $routeParams.id).success(function(){
        notifier.success('The fine has been successfully unsubscribed from the library.');
    });
    $location.path('/library-panel/fines');

});
