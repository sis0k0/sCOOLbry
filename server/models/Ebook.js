'use strict';

var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId;
var mongoosastic = require('mongoosastic');
// var elmongo = require('elmongo');

var eBookSchema = mongoose.Schema({
    // title: {
    //     type: String,
    //     required: '{PATH} is required'
    // },
    name: {
        type: String,
        default: 'default'
    },
    path: {
        type: String,
        required: '{PATH} is required'
    },
    chapters: {
        type: [String],
        // required: '{PATH} is required',
        /*jshint camelcase: false */
        es_indexed: true
        /*jshint camelcase: true */
    },
    uploaderID: {
        type: ObjectId,
        ref: 'User'
        // required: '{PATH} is required'
    },
    books: [{
        type: ObjectId,
        ref: 'Book'
    }],
    uploaded: {
        type: Date,
        default: Date.now
    }
});

eBookSchema.plugin(mongoosastic);

var eBook = mongoose.model('eBook', eBookSchema);

// eBook.sync(function(err) {
//     if(err) {
//         console.log(err);
//     }
// });

module.exports.seedInitialEbooks = function() {
    eBook.find({}).exec(function(err, collection) {
        if (err) {
            console.log('Cannot find EBooks: ' + err);
            return;
        }
        
        if (collection.length === 0) {
        }
    });
};

