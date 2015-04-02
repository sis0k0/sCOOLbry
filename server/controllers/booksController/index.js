'use strict';

module.exports = {

    addBookAvailabilitySubscription: require('./addBookAvailabilitySubscription'),
    createBook: require('./createBook'),
    createFavouriteBook: require('./createFavouriteBook'),
    deleteBookById: require('./deleteBookById'),
    deleteFavouriteBookById: require('./deleteFavouriteBookById'),
    deleteBookFromLibraryById: require('./deleteBookFromLibraryById'),
    getAllBooks: require('./getAllBooks'),
    getAllBooksFilterable: require('./getAllBooksFilterable'),
    getAllBooksFilterableCount: require('./getAllBooksFilterableCount'),
    getAllBooksSortable: require('./getAllBooksSortable'),
    getAllBooksSearchable: require('./getAllBooksSearchable'),
    getBookAvailabilitySubscription: require('./getBookAvailabilitySubscription'),
    getBookById: require('./getBookById'),
    getBookByISBN: require('./getBookByISBN'),
    getBookCount: require('./getBookCount'),
    getBookExistsByISBN: require('./getBookExistsByISBN'),
    getFavouriteBooks: require('./getFavouriteBooks'),
    getFavouriteBooksInLibrary: require('./getFavouriteBooksInLibrary'),
    isFavourite: require('./isFavourite'),
    parseEpub: require('./parseEpub'),
    removeBookAvailabilitySubscription: require('./removeBookAvailabilitySubscription'),
    scrapBookByISBN: require('./scrapBookByISBN'),
    searchBookInAmazon: require('./searchBookInAmazon'),
    searchBookInGoogleBooks: require('./searchBookInGoogleBooks'),
    updateBook: require('./updateBook')

};