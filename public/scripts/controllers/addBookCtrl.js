'use strict';

app.controller('AddBookCtrl', function($scope, $location, auth, notifier) {
    $scope.addBook = function(book) {
               
        auth.addBook(book).then(function() {
            notifier.success('Book added successfully!');
            $location.path('/admin/books');
        }, function(reason){
                notifier.error(reason);
            });
    };


});
