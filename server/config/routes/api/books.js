'use strict';

var auth        = require('../../auth'),
    controllers = require('../../../controllers'),
    express     = require('express'),
    router      = express.Router();

module.exports = function(app) {

    // Book parsers
    router.post('/books/upload', auth.isInRole('admin'), controllers.books.parseEpub);

    // Get books
    router.get('/books', controllers.books.getAllBooks);
    router.get('/books/filter/:libraryID/:field/:order/:page/:perPage/:criteria/:phrase', controllers.books.getAllBooksFilterable);
    router.get('/book/sort/:field/:order/:page/:perPage', controllers.books.getAllBooksSortable);

    // Get schema fields
    router.get('/books/fields/:isLibrary'/*, auth.isInRole('librarian')*/, controllers.books.getBookFields);

    // Check if book exists by isbn
    router.get('/isbnAvailable/:isbn', controllers.books.getBookExistsByISBN);
    
    // Add book
    router.post('/books', auth.isInRole('librarian'), controllers.books.createBook);

    // Import books
    router.post('/books/import', auth.isInRole('librarian'), controllers.books.insertBooks);

    // Search books
    router.get('/books/:id', controllers.books.getBookById);
    router.get('/book/search/:phrase/:limit', controllers.books.getAllBooksSearchable);

    router.get('/book/findByISBN/:isbn', controllers.books.getBookByISBN);
    router.get('/book/booksinprint/:isbn', auth.isInRole('librarian'), controllers.books.scrapBookByISBN);
    router.get('/book/amazonSearch/:isbn', auth.isInRole('librarian'), controllers.books.searchBookInAmazon);
    router.get('/book/googleBooksSearch/:isbn', auth.isInRole('librarian'), controllers.books.searchBookInGoogleBooks);
    
    // Get book count
    router.get('/book/count', controllers.books.getBookCount);
    router.get('/book/count/:libraryID', controllers.books.getBookCount);
    router.get('/book/countFilter/:field/:order/:page/:perPage/:criteria/:phrase/:libraryID', controllers.books.getAllBooksFilterableCount);

    // Update book
    router.put('/books', auth.isInRole('moderator'), controllers.books.updateBook);

    // Delete book
    router.get('/book/delete/:id', auth.isInRole('moderator'), controllers.books.deleteBookById);

    // Delete library book
    router.get('/book/delete2/:id', auth.isInRole('librarian'), controllers.books.deleteBookFromLibraryById);

    // Favorite books
    router.post('/book/addFavorite', auth.isAuthorized(), controllers.books.createFavouriteBook);
    router.get('/book/favorites/:userID', auth.isAuthenticatedOrInRole('moderator'), controllers.books.getFavouriteBooks);
    router.get('/book/isFavorite/:userID/:bookID', auth.isAuthenticatedOrInRole('moderator'), controllers.books.isFavourite);
    router.get('/book/favoritesLibrary/:userID/:libraryID', auth.isAuthenticatedOrInRole('librarian'), controllers.books.getFavouriteBooksInLibrary);
    router.get('/book/deleteFavorite/:userID/:bookID/:libraryID', auth.isAuthorized(), controllers.books.deleteFavouriteBookById);

    // Book availability subscriptions
    router.post('/book/availabilitySubscription', auth.isAuthenticatedOrInRole('librarian'), controllers.books.addBookAvailabilitySubscription);
    router.get('/book/availabilitySubscription/:bookID/:libraryID/:userID', auth.isAuthorized(), controllers.books.getBookAvailabilitySubscription);
    router.delete('/book/availabilitySubscription/:bookID/:libraryID/:userID', auth.isAuthorized(), controllers.books.removeBookAvailabilitySubscription);

    // Download ebook
    router.get('/book/ebook', controllers.books.downloadEbook);

    // Get all books with uploaded ebook
    router.get('/ebook', controllers.books.getEbooks);

    // Get all books with uploaded ebook by genre
    router.get('/ebook/:genre', controllers.books.getEbooksByGenre);

    // Full-text search inside books
    router.post('/books/full-text', controllers.books.getBookByContent);

    // Recognize text from image
    router.post('/image/text', controllers.books.getTextFromImage);

    app.use('/api/', router);
};
