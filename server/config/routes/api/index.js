'use strict';

module.exports = function(app) {
    require('../api/books')(app);
    require('../api/filters')(app);
    require('../api/libraries')(app);
    require('../api/users')(app);

};
