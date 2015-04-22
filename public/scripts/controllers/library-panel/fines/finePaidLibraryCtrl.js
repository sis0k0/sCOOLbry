'use strict';

app.controller('FinePaidLibraryCtrl', function($scope, $routeParams, $http, $location, notifier) {
    
    $http.get('/api/library/fine-paid/' + $routeParams.id)
    .success(function(){
        notifier.success('The fine was paid successfully.');
    })
    .error(function() {
        notifier.error('The fine wasn\'t paid! Please try again later!');
    });
    $location.path('/library-panel/fines');

});
