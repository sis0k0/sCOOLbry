'use strict';

app.factory('ajax_post', ['$http', function(_http) {

        return {           
            uploadFileInit: function(uploadedFile) {
                var fd = new FormData();
                fd.append('uploadedFile', uploadedFile);
                var uploadPromise = _http.post('/api/images',
                    fd, {
                        headers: {
                            'Content-Type': undefined
                        },
                        transformRequest: angular.identity
                    }).success(function(){
					});
				
                return uploadPromise;
            }
        };
    }
]);
