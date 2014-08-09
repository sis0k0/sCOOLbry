app.factory('ajax_post', ['$http', function(_http) {

        return {           
            uploadFile_init: function(uploadedFile) {
                var fd = new FormData();
                fd.append("uploadedFile", uploadedFile);
                var upload_promise = _http.post('/api/images',
                    fd, {
                        headers: {
                            'Content-Type': undefined
                        },
                        transformRequest: angular.identity
                    }).success(function(data){
						
					});
				
                return upload_promise;
            }
        }
    }
]);
