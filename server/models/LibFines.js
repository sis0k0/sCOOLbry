'use strict';

var mongoose = require('mongoose'),
    ObjectId = require('mongoose').Schema.ObjectId;

var libFinesSchema = mongoose.Schema({
    userID: {
        type: ObjectId,
        ref: 'User',
        required: '{PATH} is required'
    },
    libraryID: {
        type: ObjectId,
        ref: 'Library',
        required: '{PATH} is required'
    },
    amount: {
        type: Number,
        default: 0.00
    },
    username: String,
    reason: String,
    added: {
        type: Date,
        default: Date.now
    },
    paid: {
        type: Date
    },
    paymentId: {
        type: String,
        default: ''
    }
});

var LibFines = mongoose.model('LibFines', libFinesSchema);

module.exports.seedInitialLibFines = function() {
    LibFines.find({}).exec(function(err, collection) {
        if (err) {
            console.log('Cannot find fines: ' + err);
            return;
        }
        
        if (collection.length === 0) {
            //TODO: Create a few fines
        }
    });
};
