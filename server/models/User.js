'use strict';

var mongoose = require('mongoose'),
    roles = require('../filters/usersRoles'),
    encryption = require('../utilities/encryption');

var userSchema = mongoose.Schema({
    username: { 
        type: String,
        require: '{PATH} is required',
        unique: true 
    },
    firstName: { 
        type: String,
        require: '{PATH} is required' 
    },
    lastName: { 
        type: String,
        require: '{PATH} is required' 
    },
    email: {
        type: String,
        require: '{PATH} is required',
        unique: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    salt: String,
    hashPass: String,
    roles: {
        type: [String],
        default: ['standart'],
        enum: [roles.getAllRoles]
    },
    avatar: {
        type: String,
        default: 'images/icon-user-default.png'
    },
    gender: {
        type: String,
        default: 'Not specified'
    },
    dateOfBirth: Date,
    facebookUrl: String,
    twitterUrl: String,
    googlePlusUrl: String,
    aboutMe: String,
    ownLibraryID: String
});

userSchema.method({
    authenticate: function(password) {
        if (encryption.generateHashedPassword(this.salt, password) === this.hashPass) {
            return true;
        }
        else {
            return false;
        }
    }
});

var User = mongoose.model('User', userSchema);

module.exports.seedInitialUsers = function() {
    User.find({}).exec(function(err, collection) {
        if (err) {
            console.log('Cannot find users: ' + err);
            return;
        }


            if (collection.length === 0) {
                var salt;
                var hashedPwd;

                salt = encryption.generateSalt();
                hashedPwd = encryption.generateHashedPassword(salt, 'password');
                User.create({username: 'admin' +
                    '', firstName: 'Admin', lastName: 'Adminov', salt: salt, hashPass: hashedPwd, roles: ['admin']});
                
                salt = encryption.generateSalt();
                hashedPwd = encryption.generateHashedPassword(salt, 'password');
                User.create({username: 'standart', firstName: 'Standart', lastName: 'User', salt: salt, hashPass: hashedPwd, roles: ['standard']});
                
                salt = encryption.generateSalt();
                hashedPwd = encryption.generateHashedPassword(salt, 'password');
                User.create({username: 'nobody', firstName: 'Just', lastName: 'Nobody', salt: salt, hashPass: hashedPwd});
                console.log('Users added to database...');
            }

    });
};
