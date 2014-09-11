'use strict';

module.exports = function(app) {
    require('./books')(app);
    require('./filters')(app);
    require('./libraries')(app);
    require('./users')(app);

};
