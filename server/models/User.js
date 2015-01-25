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
        default: '/dist/images/icon-user-default.png'
    },
    gender: {
        type: String,
        default: 'Not specified'
    },
    dateOfBirth: Date,
    aboutMe: String,
    ownLibraryID: String,
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

                salt = encryption.generateSalt();
                hashedPwd = encryption.generateHashedPassword(salt, 'password');
                User.create({username: 'admin' +
                    '', firstName: 'Admin', lastName: 'Adminov', email:'admin@scoolbry.com', salt: salt, hashPass: hashedPwd, roles: ['admin']});
                
                salt = encryption.generateSalt();
                hashedPwd = encryption.generateHashedPassword(salt, 'password');
                User.create({username: 'standart', firstName: 'Standart', lastName: 'User', email:'test@abv.bg', salt: salt, hashPass: hashedPwd, roles: ['standard']});
                
                salt = encryption.generateSalt();
                hashedPwd = encryption.generateHashedPassword(salt, 'password');
                User.create({username: 'nobody', firstName: 'Just', lastName: 'Nobody', email:'shalqlq@abv.bg', salt: salt, hashPass: hashedPwd});
                console.log('Users added to database...');
            }

    });
};
