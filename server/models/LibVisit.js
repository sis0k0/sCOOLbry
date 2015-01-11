'use strict';

var mongoose = require('mongoose');

var libVisitSchema = mongoose.Schema({
    libraryID: {
        type: String,
        require: '{PATH} is required'
    },
    userID: {
        type: String,
        require: '{PATH} is required'
    },
    date: {
        type: Date,
        default: Date.now
    }
});

var LibVisit = mongoose.model('LibVisit', libVisitSchema);

module.exports.seedInitialLibVisit = function() {
    LibVisit.find({}).exec(function(err, collection) {
        if (err) {
            console.log('Cannot find Libraries: ' + err);
            return;
        }

        if (collection.length === 0) {
            LibVisit.remove({}, function() {});

            // Add some default visits ?
        }
    });
};
