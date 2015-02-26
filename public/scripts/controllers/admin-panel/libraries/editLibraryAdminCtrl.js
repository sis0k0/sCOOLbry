'use strict';

app.controller('EditLibraryAdminCtrl', function($scope, $http, $window, Library, User, notifier, UserResource, ajaxPost, LibraryResource, $routeParams) {

    $scope.currentLibrarians = [];
    $scope.refreshAddresses = function(address) {
        var params = {address: address, sensor: false};
        return $http.get(
            'http://maps.googleapis.com/maps/api/geocode/json',
            {params: params}
        ).then(function(response) {
            $scope.addresses = response.data.results;
        });
    };
    $scope.library = LibraryResource
        .get({id: $routeParams.id}, function(data){


            $scope.library.workHoursClosingMinutes = [];
            $scope.library.workHoursOpeningHour = [];
            $scope.library.workHoursOpeningMinutes = [];
            $scope.library.workHoursClosingHour = [];

            for(var i=0; i<7; i++) {
                if(data.workdays[i]===true) {
                    var daySchedule = data.workhours[i];
                    
                    $scope.library.workHoursOpeningHour[i] = parseInt(daySchedule.substring(0, daySchedule.indexOf(':')));
                    $scope.library.workHoursOpeningMinutes[i] = parseInt(daySchedule.substring(daySchedule.indexOf(':')+1, daySchedule.indexOf('-')));

                    $scope.library.workHoursClosingHour[i] = parseInt(daySchedule.substring(daySchedule.indexOf('-')+1, daySchedule.lastIndexOf(':')));
                    $scope.library.workHoursClosingMinutes[i] = parseInt(daySchedule.substring(daySchedule.lastIndexOf(':')+1, daySchedule.length));

                }
            }

            for(var index in $scope.library.librarians) {
                console.log($scope.library.librarians[index]);
                UserResource.get({id: $scope.library.librarians[index]}, function(data) {
                    $scope.currentLibrarians.push(data);
                    $scope.library.librarians.splice(index,1);
                });
            } 

        });

        $scope.predicate = '_id';
        $scope.reverse = false;


    // Update library
    
    $scope.updateLibrary = function(library, librarians) {

        var workdays = [];
        var workhours = [];
        var workhoursString = ''; 
        
        for(var i = 0; i < 7; i++) {            
            if(library.workdays[i]===true) {
                workdays[i] = true;
                workhoursString = library.workHoursOpeningHour[i]+':'+library.workHoursOpeningMinutes[i]+'-'+library.workHoursClosingHour[i]+':'+library.workHoursClosingMinutes[i];
                workhours[i] = workhoursString;
            }

        }

        delete library.workdays;
        delete library.workhours;
        library.workdays = workdays;
        library.workhours = workhours;

        for(var i=0; i<$scope.removedLibrarians.length; i++) {
            User.updateAsAdmin($scope.removedLibrarians[i]);
        }

        for(var i=0; i<librarians.length; i++) {
            librarians[i].roles = [];
            librarians[i].roles.push('librarian');
        }

        if(library.hasOwnProperty('librarians')) {
            for(var i=0; i<library.librarians.length; i++) {
                console.log(library.librarians[i]);
                if(library.librarians[i].hasOwnProperty('roles')===false || library.librarians[i].roles.indexOf('librarian')===-1) {
                    for(var j=0; j<$scope.users.length; j++) {
                        if($scope.users[j]._id === library.librarians[i]._id) {
                            $scope.users[j].roles.push('librarian');
                            User.updateAsAdmin($scope.users[j]).then(function() {
                            }, function(reason){
                                notifier.error(reason);
                            });
                        }
                    }
                }
            }
        }

        for(var index in $scope.currentLibrarians) {
            library.librarians.push($scope.currentLibrarians[index]._id);
        }

        Library.updateLibrary(library, librarians).then(function() {
            notifier.success('Library updated!');
            $window.location.href = '/admin/libraries';
        });
    };


    // Remove current librarian
    $scope.removedLibrarians = [];

    $scope.removeCurrentLibrarian = function(librarian) {
        $scope.currentLibrarians.splice($scope.currentLibrarians.indexOf(librarian), 1);

        librarian.ownLibraryID = '';

        if(librarian.roles.indexOf('librarian')>-1) {
            librarian.roles.splice(librarian.roles.indexOf('librarian'), 1);
        }
        if(librarian.roles.indexOf('libraryOwner')>-1) {
            librarian.roles.splice(librarian.roles.indexOf('libraryOwner'), 1);
        }

        $scope.removedLibrarians.push(librarian);

    };

    // Get list of all countries to choose from for library's location
    $http({
        method: 'get',
        url: '/api/countries'
    }).success(function(data) {
        $scope.countries = data;
    }).error(function(err) {
        console.log(err);
    });


    // Get list of users to choose from for librarians
    $http({
        method: 'get',
        url: '/api/users'
    }).success(function(data) {
        $scope.users = [];
        // Check if user is    not already a librarian (you can't be librarian at two places)
        for (var user in data) {
            if(data[user].ownLibraryID==='' || !data[user].ownLibraryID) {
                $scope.users.push(data[user]);
            }
        }
    }).error(function(err) {
        console.log(err);
    });

    // For certificate uploading

    $scope.setFileEventListener = function(element) {
        $scope.uploadedFile = element.files[0];
        
        if(typeof $scope.library === 'undefined') {
            $scope.library = new Object({});
        }
        
        $scope.library.active = true;
        if ($scope.uploadedFile) {
            $scope.$apply(function() {
                $scope.uploadButtonState = true;
            });   
        }
    };

    $scope.uploadFile = function() {
        if (!$scope.uploadedFile) {
            return;
        }

        ajaxPost.uploadFileInit($scope.uploadedFile)
            .then(function(result) {
                if (result.status === 200) {
                    $scope.library.certificate = result.data;
                    $scope.certificateUploadSuccessful = true;
                    $scope.certificateUploadError = false;
                    $scope.certificateTypeError = false;  
                    $scope.uploadButtonState = true;
                    $scope.uploadedFile = true;
                    
                }
            }, function(error) {
                console.log(error);
                if(error.data==='Invalid mime type'){
                    $scope.certificateTypeError = true;
                }
                else{
                    $scope.certificateUploadError = true;
                }
                $scope.certificateError = error.data;
            });
    };

    // Librarians
    
    $scope.librariansCount = 0;

    $scope.librarians = [];
    
    for(var i = 0; i < $scope.librariansCount; i++) {
        $scope.librarians[i] = new Object({'index': i});
    }
    

    $scope.addLibrarian = function(){
        $scope.librarians[$scope.librariansCount] = new Object({'index': $scope.librariansCount});
        $scope.librariansCount++;
    };

    $scope.removeLibrarian = function(index){
        $scope.librarians.splice(index,1);
        $scope.librariansCount--;
    };

});
