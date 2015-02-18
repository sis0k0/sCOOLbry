'use strict';

app.filter('reverse', function () {
    return function(items) {
        console.log('items: ' + items);
        return items.slice().reverse();
    };
});