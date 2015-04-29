'use strict';

module.exports = {

    addBookAvailabilitySubscription: require('./addBookAvailabilitySubscription'),
    createBook: require('./createBook'),
    createFavouriteBook: require('./createFavouriteBook'),
    deleteBookById: require('./deleteBookById'),
    deleteFavouriteBookById: require('./deleteFavouriteBookById'),
    deleteBookFromLibraryById: require('./deleteBookFromLibraryById'),
    downloadEbook: require('./downloadEbook'),
    getAllBooks: require('./getAllBooks'),
    getAllBooksFilterable: require('./getAllBooksFilterable'),
    getAllBooksFilterableCount: require('./getAllBooksFilterableCount'),
    getAllBooksSortable: require('./getAllBooksSortable'),
    getAllBooksSearchable: require('./getAllBooksSearchable'),
    getEbooks: require('./getEbooks'),
    getEbooksByGenre: require('./getEbooksByGenre'),
    getBookAvailabilitySubscription: require('./getBookAvailabilitySubscription'),
    getBookByContent: require('./getBookByContent'),
    getBookById: require('./getBookById'),
    getBookByISBN: require('./getBookByISBN'),
    getBookCount: require('./getBookCount'),
    getBookExistsByISBN: require('./getBookExistsByISBN'),
    getBookFields: require('./getBookFields'),
    getFavouriteBooks: require('./getFavouriteBooks'),
    getFavouriteBooksInLibrary: require('./getFavouriteBooksInLibrary'),
    insertBooks: require('./insertBooks'),
    isFavourite: require('./isFavourite'),
    parseEpub: require('./parseEpub'),
    removeBookAvailabilitySubscription: require('./removeBookAvailabilitySubscription'),
    scrapBookByISBN: require('./scrapBookByISBN'),
    searchBookInAmazon: require('./searchBookInAmazon'),
    searchBookInGoogleBooks: require('./searchBookInGoogleBooks'),
    updateBook: require('./updateBook')

};