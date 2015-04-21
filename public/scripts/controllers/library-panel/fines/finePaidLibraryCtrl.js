'use strict';

app.controller('FinePaidLibraryCtrl', function($scope, $routeParams, $http, $location, notifier) {
    
    $http.get('/api/library/fine-paid/' + $routeParams.id).success(function(){
        notifier.success('The fine has been successfully marke as paid.');
    });
    $location.path('/library-panel/fines');

});
