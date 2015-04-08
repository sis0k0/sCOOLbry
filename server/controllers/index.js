'use strict';

var usersController         = require('../controllers/usersController'),
    librariesController     = require('../controllers/librariesController'),
    booksController         = require('../controllers/booksController'),
    readingsController      = require('../controllers/readingsController'),
    notificationsController = require('../controllers/notificationsController');



module.exports = {
    users: usersController,
    libraries: librariesController,
    books: booksController,
    readings: readingsController,
    notifications: notificationsController
};
