'use strict';

var mongoose  = require('mongoose');

var librarySchema = mongoose.Schema({
    name: {
        type: String,
        required: '{PATH is required}',
        unique: true
    },
    yearOfEstablishment: {
        type: Number,
        min: 1900,
        max: 2015
    },
    published: {
        type: Date,
        default: Date.now
    },
    address: {
        type: Object,
        required: '{PATH is required}'
    },
    featured: {
        type: Boolean,
        default: false
    },
    visible: {
        type: Boolean,
        default: false
    },
    certified: {
        type: Boolean,
        default: false
    },
    certificate: {
        type: String
    },
    description: String,
    librarians: [String],
    tags: [String],
    workdays: {
        type: Array,
        default: [1, 2, 3, 4, 5]
    },
    workhours: {
        type: Array,
        default: [ '10:00-18:00', '10:00-18:00', '10:00-18:00', '10:00-18:00', '10:00-18:00' ]
    },
    librarySections: Object
});

var Library = mongoose.model('Library', librarySchema);

module.exports.seedInitialLibraries = function() {
    Library.find({}).exec(function(err, collection) {
        if (err) {
            console.log('Cannot find Libraries: ' + err);
            return;
        }
        
        if (collection.length === 0) {
            // Add one default library

            Library.create({
                'name': 'sCOOLbry Library',
                'address': {
                    'types': [
                        'country',
                        'political'
                    ],
                    'geometry': {
                        'viewport': {
                            'southwest': {
                                'lng': 22.3573446,
                                'lat': 41.2354469
                            },
                            'northeast': {
                                'lng': 28.6092632,
                                'lat': 44.2145381
                            }
                        },
                        'location_type': 'APPROXIMATE',
                        'location': {
                            'lng': 25.48583,
                            'lat': 42.733883
                        },
                        'bounds': {
                            'southwest': {
                                'lng': 22.3573446,
                                'lat': 41.2354469
                            },
                            'northeast': {
                                'lng': 28.6092632,
                                'lat': 44.2145381
                            }
                        }
                    },
                    'formatted_address': 'Bulgaria',
                    'address_components': [
                        {
                            'types': [
                                'country',
                                'political'
                            ],
                            'short_name': 'BG',
                            'long_name': 'Bulgaria'
                        }
                    ]
                },
                'certificate': 'http://i.imgur.com/qVo1Hhbm.jpg',
                'certified': true,
                'visible': true,
                'featured': true,
            });

            console.log('Library added to the database...');
        }
    });
};
