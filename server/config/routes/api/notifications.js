'use strict';

var auth        = require('../../auth'),
    controllers = require('../../../controllers'),
    express     = require('express'),
    router      = express.Router();

module.exports = function(app) {

    router.get('/notifications/:id', auth.isAuthorized(), controllers.notifications.getUserNotifications);
    router.put('/notifications/:id/:userID', auth.isAuthorized(), controllers.notifications.updateNotification);

    app.use('/api/', router);
};
