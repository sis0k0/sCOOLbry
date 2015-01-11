'use strict';

app.config(function($locationProvider, reCAPTCHAProvider) {
     
    // remove # from urls
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
    
    // Set reCaptcha
    reCAPTCHAProvider.setPublicKey('6Lcy4csSAAAAAFdcvcxawMgzlJCabD0G5bk5lp2U');
    reCAPTCHAProvider.setOptions({
       theme: 'clean'
    });

    

});