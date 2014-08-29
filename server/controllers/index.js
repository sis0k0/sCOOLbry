var usersController = require('../controllers/usersController');
var librariesController = require('../controllers/librariesController');
var booksController = require('../controllers/booksController');

module.exports = {
    users: usersController,
    libraries: librariesController,
    books: booksController
}
