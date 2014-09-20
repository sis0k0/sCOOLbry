'use strict';

var usersController = require('../controllers/usersController');
var librariesController = require('../controllers/librariesController');
var booksController = require('../controllers/booksController');
var readingsController = require('../controllers/readingsController');

module.exports = {
    users: usersController,
    libraries: librariesController,
    books: booksController,
    readings: readingsController
};
