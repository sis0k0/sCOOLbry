'use strict';

//socket factory that provides the socket service
/*global io:false */
app.factory('Socket', ['socketFactory', '$location',
    function(socketFactory, $location) {
        console.log('dsadsa');
        return socketFactory({
            prefix: '',
            ioSocket: io.connect( $location.protocol() + '://' + $location.host() + ':' + $location.port() )
        });
    }
]);