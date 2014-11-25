'use strict';

var auth        = require('../../auth'),
	controllers = require('../../../controllers'),
	express     = require('express'),
	router      = express.Router();

module.exports = function(app) {

	// Libraries

	router.get('/libraries', controllers.libraries.getAllLibraries);

	router.post('/libraries', controllers.libraries.createLibrary);

	router.get('/libraries/:id', controllers.libraries.getLibraryById);
	router.get('/library/books/:id', controllers.libraries.getLibraryBooksById);


	router.get('/library/book/:id', controllers.libraries.getLibBookById);
	router.post('/library/book', auth.isInRole('librarian'), controllers.libraries.addLibBook);

	router.get('/library/book2/:bookID/:libraryID', controllers.libraries.getLibBook);
	
	router.put('/library/book', auth.isInRole('librarian'), controllers.libraries.updateLibBook);
	router.get('/library/users/:id/:field/:order/:page/:perPage', controllers.libraries.getLibraryUsersById);
	router.get('/library/sort/:field/:order/:page/:perPage', auth.isInRole('admin'), controllers.libraries.getAllLibrariesSortable);
	router.get('/library/count', controllers.libraries.getLibraryCount);
	router.get('/library/user-count', controllers.libraries.getLibraryUsersCount);
	router.put('/libraries', controllers.libraries.updateLibrary);
	router.get('/library/delete/:id', auth.isInRole('admin'), controllers.libraries.deleteLibraryById);

	// Subscribe for library
	router.post('/library/add-user', auth.isAuthenticatedOrInRole('librarian'), controllers.libraries.addLibraryUser);
	// Unsubscribe
	router.get('/library/delete-user/:id/:libraryID', auth.isAuthenticatedOrInRole('librarian'), controllers.libraries.deleteLibraryUser);


	router.post('/library/add-reading', auth.isInRole('librarian'), controllers.libraries.takeBook);
	router.post('/library/remove-reading', auth.isInRole('librarian'), controllers.libraries.returnBook);
	router.get('/library/all-readings', controllers.libraries.getAllReadings);
	router.get('/library/not-returned/:libraryID/:userID', controllers.libraries.getAllNotReturnedReadings);
	router.get('/library/member/:libraryID/:userID', controllers.libraries.isMember);

	router.get('/library/addLibrarian/:libraryID/:userID', auth.isInRole('admin'), controllers.libraries.addLibrarian);

	router.get('/library/subscribers/:libraryID', controllers.libraries.getLibraryUsersInLibraryCount);

	router.post('/library/addbooking', controllers.libraries.addBooking);

	router.get('/library/booking/:libraryID/:bookID', controllers.libraries.getBookingCountBook);
	router.get('/library/booking-sort/:libraryID/:field/:order/:page/:perPage', auth.isInRole('librarian'), controllers.libraries.getAllBookingsSortable);

	router.get('/library/booking-count/:libraryID', controllers.libraries.getBookingCountLibrary);
	router.get('/library/available/:bookID/:libraryID', controllers.libraries.isBookAvailable);
	app.use('/api/', router);
};
