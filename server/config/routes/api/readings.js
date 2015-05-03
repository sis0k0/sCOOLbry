'use strict';

var auth = require('../../auth'),
    controllers = require('../../../controllers'),
    express     = require('express'),
    router      = express.Router();

module.exports = function(app) {

    // All readings
    router.get('/all-readings', auth.isInRole('moderator'), controllers.readings.getAllReadings);

    // All readings for user
    router.get('/all-readings/:userID', auth.isAuthenticatedOrInRole('moderator'), controllers.readings.getAllReadingsUser);

    // All readings for user, used in profile info
    router.get('/all-readings-profile/:userID', auth.isAuthenticatedOrInRole('moderator'), controllers.readings.getAllReadingsUserProfile);

    // All readings for user in specific library
    router.get('/all-readings/:libraryID/:userID', auth.isAuthenticatedOrInRole('librarian'), controllers.readings.getAllReadingsInLibraryForUser);

    // All readings in library
    router.get('/all-readings-library/:libraryID', auth.isInRole('librarian'), controllers.readings.getAllReadingsInLibrary);
    
    
    app.use('/api/', router);
};
