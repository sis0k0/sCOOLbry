'use strict';

var mongoose   = require('mongoose'),
    roles      = require('../filters/usersRoles'),
    encryption = require('../utilities/encryption'),
    shortId    = require('shortid');

var userSchema = mongoose.Schema({
    id: {
        type: String,
        unique: true,
        'default': shortId.generate
    },
    username: { 
        type: String,
        required: '{PATH} is required',
        match: [
            /^[a-z.0-9_-]{3,16}$/,
            'Username must contain lowercase letters, digits, dots, hyphens and underscores. 3-16 characters'
        ],
        unique: true 
    },
    firstName: { 
        type: String,
        required: '{PATH} is required' 
    },
    lastName: { 
        type: String,
        required: '{PATH} is required' 
    },
    email: {
        type: String,
        required: '{PATH} is required',
        match: [
            /^[a-z]+[a-z0-9._]+@[a-z0-9]+[a-z0-9-]+[a-z0-9]+[.][a-z]{2,5}$/,
            'Email format is not valid'
        ],
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
        enum: [roles.getAllRoles],
        default: ['standart']
    },
    avatar: {
        type: String,
        default: '/dist/images/icon-user-default.png'
    },
    gender: {
        type: String,
        enum: ['Female', 'Male', 'Not specified'],
        default: 'Not specified'
    },
    dateOfBirth: Date,
    aboutMe: {
        type: String,
        validate: [
            function(v) {
                return v.length>0 && v.length<500;
            },
            '"About me" length should be between 0 and 500 characters'
        ]
    },
    style: {
        type: String,
        default: 'flatly'
    },
    ownLibraryID: String,
    facebookUrl: String,
    twitterUrl: String,
    googlePlusUrl: String,
    librarySubscriptions: [String],
    facebook         : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },
    twitter          : {
        id           : String,
        token        : String,
        displayName  : String,
        username     : String
    },
    google           : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    }
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

userSchema.statics.findUniqueUsername = function(username, suffix, callback) {
    var _this = this;
    var possibleUsername = username + (suffix || '');

    _this.findOne({username: possibleUsername}, function(err, user) {
        if(!err) {
            if (!user) {
                callback(possibleUsername);
            } else {
                return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
            }
        } else {
            callback(null);
        }
    });
};

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

            // Admin
            salt = encryption.generateSalt();
            hashedPwd = encryption.generateHashedPassword(salt, 'scoolbry');
            User.create({
                username: 'admin',
                firstName: 'Admin',
                lastName: 'Adminov',
                email:'admin@scoolbry.com',
                salt: salt,
                hashPass: hashedPwd,
                roles: ['admin']
            });
  
            // Standart          
            salt = encryption.generateSalt();
            hashedPwd = encryption.generateHashedPassword(salt, 'scoolbry');
            User.create({
                username: 'user',
                firstName: 'Standart',
                lastName: 'User',
                email:'user@scoolbry.com',
                salt: salt,
                hashPass: hashedPwd,
                roles: ['standard']
            });
          
            // Moderator
            salt = encryption.generateSalt();
            hashedPwd = encryption.generateHashedPassword(salt, 'scoolbry');
            User.create({
                username: 'moderator',
                firstName: 'Moderator',
                lastName: 'Test',
                email:'moderator@scoolbry.com',
                salt: salt,
                hashPass: hashedPwd,
                roles: ['moderator']
            });
            
            // Library owner
            salt = encryption.generateSalt();
            hashedPwd = encryption.generateHashedPassword(salt, 'scoolbry');
            User.create({
                username: 'owner',
                firstName: 'Library',
                lastName: 'Owner',
                email:'owner@scoolbry.com',
                salt: salt,
                hashPass: hashedPwd,
                roles: ['libraryOwner']
            });
            
            // Librarian
            salt = encryption.generateSalt();
            hashedPwd = encryption.generateHashedPassword(salt, 'scoolbry');
            User.create({
                username: 'librarian',
                firstName: 'Just',
                lastName: 'Librarian',
                email:'librarian@scoolbry.com',
                salt: salt,
                hashPass: hashedPwd,
                roles: ['librarian']
            });

            // Additional admin
            salt = encryption.generateSalt();
            hashedPwd = encryption.generateHashedPassword(salt, 'dsadsa');
            User.create({
                username: 'sis0k0',
                firstName: 'Stanimira',
                lastName: 'Vlaeva',
                email:'sis0k0@abv.com',
                salt: salt,
                hashPass: hashedPwd,
                roles: ['admin']
            });
            
            console.log('Users added to database...');
        }

    });
};
