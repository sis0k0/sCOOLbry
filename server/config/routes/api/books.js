'use strict';

var auth        = require('../../auth'),
    controllers = require('../../../controllers'),
    express     = require('express'),
    router      = express.Router();

module.exports = function(app) {
    
    // Get books
    router.get('/books', controllers.books.getAllBooks);
    router.get('/book/sort/:field/:order/:page/:perPage', auth.isInRole('librarian'), controllers.books.getAllBooksSortable);

    // Check if book exists by isbn
    router.get('/isbnAvailable/:isbn', controllers.books.getBookExistsByISBN);
    
    // Add book
    router.post('/books', auth.isInRole('librarian'), controllers.books.createBook);

    // Search books
    router.get('/books/:id', controllers.books.getBookById);
    router.get('/book/search/:phrase/:limit', controllers.books.getAllBooksSearchable);

    router.get('/book/findByISBN/:isbn', controllers.books.getBookByISBN);
    router.get('/book/booksinprint/:isbn', auth.isInRole('librarian'), controllers.books.scrapBookByISBN);
    router.get('/book/amazonSearch/:isbn', auth.isInRole('librarian'), controllers.books.searchBookInAmazon);
    router.get('/book/googleBooksSearch/:isbn', auth.isInRole('librarian'), controllers.books.searchBookInGoogleBooks);
    
    // Get book count
    router.get('/book/count', controllers.books.getBookCount);

    // Update book
    router.put('/books', auth.isInRole('moderator'), controllers.books.updateBook);

    // Delete book
    router.get('/book/delete/:id', auth.isInRole('moderator'), controllers.books.deleteBookById);

    // Delete library book
    router.get('/book/delete2/:id', auth.isInRole('librarian'), controllers.books.deleteBookFromLibraryById);

    // Favourite books
    router.post('/book/addFavourite', auth.isAuthorized(), controllers.books.createFavouriteBook);
    router.get('/book/favourites/:userID', auth.isAuthenticatedOrInRole('moderator'), controllers.books.getFavouriteBooks);
    router.get('/book/isFavourite/:userID/:bookID', auth.isAuthenticatedOrInRole('moderator'), controllers.books.isFavourite);
    router.get('/book/favouritesLibrary/:userID/:libraryID', auth.isAuthenticatedOrInRole('librarian'), controllers.books.getFavouriteBooksInLibrary);
    router.get('/book/deleteFavourite/:bookID', auth.isAuthorized(), controllers.books.deleteFavouriteBookById);

    // Book availability subscriptions
    router.post('/book/availabilitySubscription', auth.isAuthenticatedOrInRole('librarian'), controllers.books.addBookAvailabilitySubscription);
    router.get('/book/availabilitySubscription/:bookID/:libraryID/:userID', auth.isAuthorized(), controllers.books.getBookAvailabilitySubscription);
    router.delete('/book/availabilitySubscription/:bookID/:libraryID/:userID', auth.isAuthorized(), controllers.books.removeBookAvailabilitySubscription);


    app.use('/api/', router);
};
