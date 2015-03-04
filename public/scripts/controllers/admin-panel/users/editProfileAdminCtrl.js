'use strict';

app.controller('EditProfileAdminCtrl', function($scope, $location, $routeParams, $http, $filter, User, ajaxPost, UserResource, notifier) {

    $scope.today = new Date();

    // Handle error function
    var handleError = function(reason) {
        if(reason instanceof Object) {
            notifier.error($filter('titleCase')(reason.name));
            $scope.mongooseErrors = reason.errors;
        } else {
            notifier.error(reason);
        }
    };

    // Get user resource
    $scope.user = UserResource.get({id: $routeParams.id}, function(data) {
        if(!data) {
            $location.path('/404');
        }
    }, function() {             // if error occurs
        $location.path('/404'); // go to 404 page
    });


    // Update User
    $scope.updateAsAdmin = function(user) {

        if(user.roles.indexOf('librarian')!==-1 || user.roles.indexOf('libraryOwner')!==-1) {


            if($scope.newLibrary===true) {


                User.updateAsAdmin(user, $scope.library, true).then(function() {
                    $location.path('/admin/users');
                });
            } else {

                if(user.hasOwnProperty('ownLibraryID') && user.hasOwnProperty!=='') {
                    User.updateAsAdmin(user, user.ownLibraryID, false).then(function() {
                        $location.path('/admin/users');
                    }, function(reason){
                        handleError(reason);
                    });
                } else {
                    User.updateAsAdmin(user).then(function() {
                        $location.path('/admin/users');
                    }, function(reason){
                        handleError(reason);

                    });
                }
            }

        } else {
            user.ownLibraryID='';
            User.updateAsAdmin(user).then(function() {
                $location.path('/admin/users');
                notifier.success('User ' + user.username + ' updated!');
            }, function(reason){
                console.log(reason);
                handleError(reason);
            });
        }
    };

    // Get website's available roles
    $http({
        method: 'get',
        url: '/api/roles'
    }).success(function(data) {
        $scope.roles = data;
    }).error(function(err) {
        console.log(err);
    });

    // Get all libraries
    $http({
        method: 'get',
        url: '/api/libraries'
    }).success(function(data) {
        $scope.libraries = data;
        $scope.libraryObject = $scope.user.ownLibraryID;
    }).error(function(err) {
        console.log(err);
    });

    // Get list of all countries to choose from for user's location
    $http({
        method: 'get',
        url: '/api/countries'
    }).success(function(data) {
        $scope.countries = data;
    }).error(function(err) {
        console.log(err);
    });


    // Linking user to library
    $scope.newLibrary = false;

    $scope.selectLibrary = function() {
        $scope.user.ownLibraryID = $scope.libraryObject;
    };

    $scope.addNewLibrary = function() {
        $scope.library = new Object({'librarians' : [$scope.user._id]});
        $scope.newLibrary = true;
    };

    $scope.removeNewLibrary = function() {
        $scope.library = undefined;
        $scope.newLibrary = false;
    };


    // Upload avatar

    $scope.upload = false;

    $scope.setFileEventListener = function(element, field) {

        if(field==='avatar') {
            $scope.uploadedAvatar = element.files[0];

            if ($scope.uploadedAvatar) {
                $scope.$apply(function() {
                    $scope.uploadAvatarButtonState = true;
                });   
            }            
        } else if(field==='certificate') {
            $scope.uploadedCertificate = element.files[0];

            if ($scope.uploadedCertificate) {
                $scope.$apply(function() {
                    $scope.uploadCertificateButtonState = true;
                });   
            }            
        }

    };

    $scope.uploadFile = function(field) {

        if(field==='avatar') {
            if (!$scope.uploadedAvatar) {
                return;
            }

        ajaxPost.uploadFileInit($scope.uploadedAvatar)
            .then(function(result) {
                if (result.status === 200) {
                    $scope.user.avatar = result.data;
                    $scope.avatarUploadSuccessful = true;
                    $scope.avatarUploadError = false;
                    $scope.avatarTypeError = false;  
                }
            }, function(error) {
                console.log(error);
                if(error.data==='Invalid mime type'){
                    $scope.avatarTypeError = true;
                }
                else{
                    $scope.avatarUploadError = true;
                }
                $scope.avatarError = error.data;
            });

        } else {

            if (!$scope.uploadedCertificate) {
                return;
            }

            ajaxPost.uploadFileInit($scope.uploadedCertificate)
                .then(function(result) {
                    if (result.status === 200) {
                        $scope.library.certificate = result.data;
                        $scope.certificateUploadSuccessful = true;
                        $scope.certificateUploadError = false;
                        $scope.certificateTypeError = false;
                    }
                }, function(error) {
                    if(error.data==='Invalid mime type'){
                        $scope.certificateTypeError = true;
                    }
                    else{
                        $scope.certificateUploadError = true;
                    }
                    $scope.certificateError = error.data;
                });    

        }
    };

});
