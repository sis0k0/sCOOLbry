'use strict';

module.exports = {

	addBooking: require('./addBooking'),
	addLibBook: require('./addLibBook'),
	addLibrarian: require('./addLibrarian'),
	addLibraryUser: require('./addLibraryUser'),
	createLibrary: require('./createLibrary'),
	deleteLibraryById: require('./deleteLibraryById'),
	deleteLibraryUser: require('./deleteLibraryUser'),
	getAllBookingsSortable: require('./getAllBookingsSortable'),
	getAllLibraries: require('./getAllLibraries'),
	getAllLibrariesSortable: require('./getAllLibrariesSortable'),
	getAllNotReturnedReadings: require('./getAllNotReturnedReadings'),
	getAllReadings: require('./getAllReadings'),
	getAllReadingsSortable: require('./getAllReadingsSortable'),
	getBookingCountBook: require('./getBookingCountBook'),
	getBookingCountLibrary: require('./getBookingCountLibrary'),
	getLibBook: require('./getLibBook'),
	getLibBookById: require('./getLibBookById'),
	getLibBookBySection: require('./getLibBookBySection'),
	getLibraryBooksById: require('./getLibraryBooksById'),
	getLibraryById: require('./getLibraryById'),
	getLibraryCount: require('./getLibraryCount'),
	getLibraryUsersById: require('./getLibraryUsersById'),
	getLibraryUsersCount: require('./getLibraryUsersCount'),
	getLibraryUsersInLibraryCount: require('./getLibraryUsersInLibraryCount'),
	getUserPendingReadings: require('./getUserPendingReadings'),
	getUserReadingHistory: require('./getUserReadingHistory'),
	isBookAvailable: require('./isBookAvailable'),
	isMember: require('./isMember'),
	returnBook: require('./returnBook'),
	takeBook: require('./takeBook'),
	updateLibBook: require('./updateLibBook'),
	updateLibrary: require('./updateLibrary')

};