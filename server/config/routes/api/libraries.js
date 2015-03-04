'use strict';

var auth        = require('../../auth'),
    controllers = require('../../../controllers'),
    express     = require('express'),
    router      = express.Router();

module.exports = function(app) {

    // Libraries
    router.get('/libraries', controllers.libraries.getAllLibraries);
    router.get('/libraries/:id', controllers.libraries.getLibraryById);
    router.get('/nameAvailable/:name', controllers.libraries.libraryNameAvailable);
    router.post('/libraries', controllers.libraries.createLibrary);
    router.put('/libraries', controllers.libraries.updateLibrary);
    router.get('/library/delete/:id', auth.isInRole('admin'), controllers.libraries.deleteLibraryById);
    
    router.get('/library/sort/:field/:order/:page/:perPage', auth.isInRole('admin'), controllers.libraries.getAllLibrariesSortable);
    router.get('/library/count', controllers.libraries.getLibraryCount);

    // Get library books
    router.get('/library/books/:id/:available/:userID', controllers.libraries.getLibraryBooksById);

    // Get all libraries that have a copy of a book
    router.get('/library/lib-books/:id', controllers.libraries.getLibBooksByBook);

    // Library books
    router.get('/library/book/:id', controllers.libraries.getLibBookById);
    router.post('/library/book', auth.isInRole('librarian'), controllers.libraries.addLibBook);
    router.put('/library/book', auth.isInRole('librarian'), controllers.libraries.updateLibBook);
    
    router.get('/library/book2/:bookID/:libraryID', controllers.libraries.getLibBook);
    router.get('/library/section/:section/:libraryID', controllers.libraries.getLibBookBySection);

    // Library users
    router.get('/library/users/:id/:field/:order/:page/:perPage', auth.isInRole('librarian'), controllers.libraries.getLibraryUsersById);
    router.get('/library/user-count/:id', controllers.libraries.getLibraryUsersCount);

    // Subscribe for library
    router.post('/library/add-user', auth.isAuthenticatedOrInRole('librarian'), controllers.libraries.addLibraryUser);
    // Unsubscribe
    router.get('/library/delete-user/:id/:libraryID', auth.isAuthenticatedOrInRole('librarian'), controllers.libraries.deleteLibraryUser);
    // Check whether user's a library member
    router.get('/library/member/:libraryID/:userID', auth.isAuthenticatedOrInRole('librarian'), controllers.libraries.isMember);

    // Get user pending readings and bookings at library
    router.get('/library/pending/:userID/:libraryID', controllers.libraries.getUserPendingReadings);
    // Get user pending readings and bookings
    router.get('/library/pending/:userID', auth.isAuthenticatedOrInRole('librarian'), controllers.libraries.getUserBookingsAndReadings);

    // Get library ID from library owner barcode card
    router.get('/library/getLibraryID/:userID', controllers.libraries.getLibraryIDByOwner);


    // READINGS
    router.post('/library/add-reading', auth.isInRole('librarian'), controllers.libraries.takeBook);
    router.post('/library/remove-reading', auth.isInRole('librarian'), controllers.libraries.returnBook);
    router.get('/library/all-readings', auth.isInRole('librarian'), controllers.libraries.getAllReadings);
    router.get('/library/reading-sort/:libraryID/:field/:order/:page/:perPage', auth.isInRole('librarian'), controllers.libraries.getAllReadingsSortable);
    router.get('/library/reading-count/:libraryID', controllers.libraries.getReadingCountLibrary);

    router.get('/library/not-returned/:libraryID/:userID', controllers.libraries.getAllNotReturnedReadings);

    router.get('/library/addLibrarian/:libraryID/:userID', auth.isInRole('libraryOwner'), controllers.libraries.addLibrarian);

    router.get('/library/subscribers/:libraryID', controllers.libraries.getLibraryUsersInLibraryCount);

    // LIBRARY VISITS

    // All visits for library
    router.get('/library/visits/:libraryID/:field/:order/:page/:perPage', auth.isInRole('librarian'), controllers.libraries.getAllLibraryVisitsSortable);

    // Single user visits
    router.get('/library/visits/:userID',auth.isAuthenticatedOrInRole('librarian'), controllers.libraries.getUserLibraryVisits);


    // BOOKINGS

    router.post('/booking', auth.isAuthorized(), controllers.libraries.addBooking);
    router.delete('/booking/:id', controllers.libraries.deleteBooking);

    router.get('/library/booking/:libraryID/:bookID', controllers.libraries.getBookingsBookInLibrary);
    router.get('/library/booking-sort/:libraryID/:field/:order/:page/:perPage', auth.isInRole('librarian'), controllers.libraries.getAllBookingsSortable);

    router.get('/library/booking-count/:libraryID/:bookID', controllers.libraries.getBookingCountBook);
    router.get('/library/booking-count/:libraryID', controllers.libraries.getBookingCountLibrary);

    router.get('/library/available/:bookID/:libraryID', controllers.libraries.isBookAvailable);
    app.use('/api/', router);
};
