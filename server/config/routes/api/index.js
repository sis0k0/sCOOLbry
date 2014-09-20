'use strict';

module.exports = function(app) {
    require('./books')(app);
    require('./filters')(app);
    require('./libraries')(app);
    require('./readings')(app);
    require('./users')(app);

};
