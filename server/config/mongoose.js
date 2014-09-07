'use strict';

var mongoose = require('mongoose'),
    user = require('../models/User'),
    library = require('../models/Library'),
    book = require('../models/Book'),
    libBook = require('../models/LibBook'),
    libUser = require('../models/LibUser');

module.exports = function(config) {
    mongoose.connect(config.db);
    var db = mongoose.connection;

    db.once('open', function(err) {
        if (err) {
            console.log('Database could not be opened: ' + err);
            return;
        }

        console.log('Database up and running...');
    });

    db.on('error', function(err){
        console.log('Database error: ' + err);
    });

    user.seedInitialUsers();
    library.seedInitialLibraries();
    book.seedInitialBooks();
    libBook.seedInitialLibBook();
    libBook.seedInitialLibUser();
};
