'use strict';

module.exports = {

    addBooking: require('./addBooking'),
    addLibBook: require('./addLibBook'),
    addLibrarian: require('./addLibrarian'),
    addLibraryUser: require('./addLibraryUser'),
    createLibrary: require('./createLibrary'),
    deleteBooking: require('./deleteBooking'),
    deleteLibraryById: require('./deleteLibraryById'),
    deleteLibraryUser: require('./deleteLibraryUser'),
    getAllBookingsSortable: require('./getAllBookingsSortable'),
    getAllLibraries: require('./getAllLibraries'),
    getAllLibraryVisitsSortable: require('./getAllLibraryVisitsSortable'),
    getAllLibrariesSortable: require('./getAllLibrariesSortable'),
    getAllNotReturnedReadings: require('./getAllNotReturnedReadings'),
    getAllReadings: require('./getAllReadings'),
    getAllReadingsSortable: require('./getAllReadingsSortable'),
    getBookingsBookInLibrary: require('./getBookingsBookInLibrary'),
    getBookingCountBook: require('./getBookingCountBook'),
    getBookingCountLibrary: require('./getBookingCountLibrary'),
    getLibBook: require('./getLibBook'),
    getLibBooksByBook: require('./getLibBooksByBook'),
    getLibBookById: require('./getLibBookById'),
    getLibBookBySection: require('./getLibBookBySection'),
    getLibraryBooksById: require('./getLibraryBooksById'),
    getLibraryById: require('./getLibraryById'),
    getLibraryCount: require('./getLibraryCount'),
    getLibraryIDByOwner: require('./getLibraryIDByOwner'),
    getLibraryUsersById: require('./getLibraryUsersById'),
    getLibraryUsersCount: require('./getLibraryUsersCount'),
    getLibraryUsersInLibraryCount: require('./getLibraryUsersInLibraryCount'),
    getUserBookingsAndReadings: require('./getUserBookingsAndReadings'),
    getUserLibraryVisits: require('./getUserLibraryVisits'),
    getUserPendingReadings: require('./getUserPendingReadings'),
    getReadingCountLibrary: require('./getReadingCountLibrary'),
    isBookAvailable: require('./isBookAvailable'),
    isMember: require('./isMember'),
    returnBook: require('./returnBook'),
    takeBook: require('./takeBook'),
    updateLibBook: require('./updateLibBook'),
    updateLibrary: require('./updateLibrary')

};