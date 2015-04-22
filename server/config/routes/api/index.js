'use strict';

module.exports = function(app, config) {
    require('./books')(app);
    require('./filters')(app);
    require('./libraries')(app);
    require('./payment')(app);
    require('./readings')(app);
    require('./notifications')(app);
    require('./users')(app, config);

};
