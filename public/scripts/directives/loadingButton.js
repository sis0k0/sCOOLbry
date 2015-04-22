'use strict';

app.directive('loadingButton', function () {
    return {
        restrict: 'A',
        link: function ($scope, $elem) {
                        
            $elem.click(function () {
                $elem.button('loading');
            });

            $scope.$watchGroup([
                'user.avatar',
                'searchState',
                'library.certificate',
                'book.cover',
                'book.ebookUrl',
                'ebookUploadError',
                'avatarError',
                'certificateError',
                'coverError'
                ], function(){
                $elem.button('reset');
            });
        }
    };
});
