'use strict';

app.controller('FineDeleteFromLibraryCtrl', function($scope, $routeParams, $http, $location, notifier) {
    
    $http.get('/api/library/fine-remove/' + $routeParams.id)
    .success(function(){
        notifier.success('The fine has been successfully removed');
    })
    .error(function() {
        notifier.error('The fine wasn\'t removed! Please try again later!');
    });
    $location.path('/library-panel/fines');

});
