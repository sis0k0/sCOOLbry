'use strict';

var mongoose = require('mongoose');

var libUserSchema = mongoose.Schema({
    userID: String,
    libraryID: String,
    username: String,
    given: Number,
    toReturn: Number
});

var LibUser = mongoose.model('LibUser', libUserSchema);

module.exports.seedInitialLibUser = function() {
    LibUser.find({}).exec(function(err, collection) {
        if (err) {
            console.log('Cannot find Libraries: ' + err);
            return;
        }
        
        if (collection.length === 0) {
            LibUser.create({userID: '53ca7bd40339fad80dada050', libraryID: '53f31579fa4b43591545c41a', username: 'admin', given: 5, toReturn: 2});
            LibUser.create({userID: '53ca7bf50339fad80dada062', libraryID: '53f31579fa4b43591545c41a', username: 'peshopbs2', given: 3, toReturn: 2});
            
        }
    });
};
