'use strict';

app.filter('titleCase', function() {
    return function(input) {
        return (typeof input === 'string') ? 
        input.charAt(0).toUpperCase() + input.substr(1).replace(/[A-Z]/g, ' $&') : 
        input;
    };
});