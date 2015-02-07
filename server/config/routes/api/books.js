'use strict';

var auth        = require('../../auth'),
    controllers = require('../../../controllers'),
    express     = require('express'),
    router      = express.Router();

module.exports = function(app) {
    
    // Books
    router.get('/books', controllers.books.getAllBooks);
    router.post('/books', auth.isInRole('librarian'), controllers.books.createBook);

    // Search book
    router.get('/books/:id', controllers.books.getBookById);
    router.get('/book/findByISBN/:isbn', controllers.books.getBookByISBN);
    router.get('/book/booksinprint/:isbn', auth.isInRole('librarian'), controllers.books.scrapBookByISBN);
    router.get('/book/amazonSearch/:isbn', auth.isInRole('librarian'), controllers.books.searchBookInAmazon);
    router.get('/book/googleBooksSearch/:isbn', auth.isInRole('librarian'), controllers.books.searchBookInGoogleBooks);
    router.get('/book/search/:phrase/:limit',  controllers.books.getAllBooksSearchable);
    

    router.get('/book/sort/:field/:order/:page/:perPage', auth.isInRole('librarian'), controllers.books.getAllBooksSortable);
    router.get('/book/count', controllers.books.getBookCount);
    router.put('/books', auth.isInRole('librarian'), controllers.books.updateBook);
    router.get('/book/delete/:id', auth.isInRole('librarian'), controllers.books.deleteBookById);
    router.get('/book/delete2/:id', auth.isInRole('librarian'), controllers.books.deleteBookFromLibraryById);

    //favourite book

    router.post('/book/addFavourite', controllers.books.createFavouriteBook);
    router.get('/book/favourites/:userID', controllers.books.getFavouriteBooks);
    router.get('/book/isFavourite/:userID/:bookID', controllers.books.isFavourite);
    router.get('/book/favouritesLibrary/:userID/:libraryID', controllers.books.getFavouriteBooksInLibrary);
    router.get('/book/deleteFavourite/:bookID', controllers.books.deleteFavouriteBookById);

    // book subscriptions

    router.post('/book/availabilitySubscription', controllers.books.addBookAvailabilitySubscription);
    router.get('/book/availabilitySubscription/:bookID/:libraryID/:userID', controllers.books.getBookAvailabilitySubscription);
    router.delete('/book/availabilitySubscription/:bookID/:libraryID/:userID', controllers.books.removeBookAvailabilitySubscription);


    app.use('/api/', router);
};
