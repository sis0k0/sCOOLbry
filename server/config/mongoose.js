'use strict';

var mongoose = require('mongoose'),
    user     = require('../models/User'),
    library  = require('../models/Library'),
    book     = require('../models/Book'),
    favBook  = require('../models/FavBook'),
    libBook  = require('../models/LibBook'),
    libVisit = require('../models/LibVisit'),
    libUser  = require('../models/LibUser'),
    libMap   = require('../models/LibMap'),
    reading  = require('../models/Reading'),
    booking  = require('../models/Booking');

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
    favBook.seedInitialFavBook();
    libBook.seedInitialLibBook();
    libVisit.seedInitialLibVisit();
    libUser.seedInitialLibUser();
    libMap.seedInitialLibMap();
    reading.seedInitialReadings();
    booking.seedInitialReadings();
};
