'use strict';

module.exports = function(app) {
    require('../routes/api')(app);
    require('../routes/partials')(app);
};
