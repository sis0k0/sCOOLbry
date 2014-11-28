'use strict';

module.exports = function(app, config) {
	console.log(config);
    require('./api')(app, config);
    require('./partials')(app);
};
