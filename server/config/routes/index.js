'use strict';

module.exports = function(app, config) {
    require('./api')(app, config);
    require('./partials')(app);
};
