app.factory('ajax_post', ['$http', function(_http) {

        return {           
            uploadFile_init: function(uploadedFile) {
                var fd = new FormData();
                fd.append("uploadedFile", uploadedFile);
                var upload_promise = _http.post('/images/',
                    fd, {
                        headers: {
                            'Content-Type': undefined
                        },
                        transformRequest: angular.identity
                    });

                return upload_promise;
            }
        }
    }
]);