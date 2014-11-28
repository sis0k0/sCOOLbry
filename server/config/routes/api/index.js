'use strict';

module.exports = function(app, config) {
    require('./books')(app);
    require('./filters')(app);
    require('./libraries')(app);
    require('./readings')(app);
    require('./users')(app, config);

};
