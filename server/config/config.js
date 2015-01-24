'use strict';

var path     = require('path'),
    rootPath = path.normalize(__dirname + '/../../');

module.exports = {
    development: {
        rootPath: rootPath,
        db: 'mongodb://localhost/scoolbry',
        port: process.env.PORT || 3030,
        facebook: {
            clientID: '1512522278997261',
            clientSecret: '95bfbb52c31bab56bedcb1011e617523',
            callbackURL: 'http://localhost:3030/api/auth/facebook/callback'
        },

        twitter: {
            consumerKey       : 'dn1vIPB9VhWZcF7hYVDpJFyZd',
            consumerSecret    : '0vJOYrmYEnT8onw55aPwBXDPwNv0xpNXoWJVymFni6STfDzA9j',
            callbackURL       : 'http://localhost:3030/api/auth/twitter/callback'
        },
        google : {
            clientID      : 'your-consumer-key-here',
            clientSecret  : 'your-client-secret-here',
            callbackURL   : 'http://localhost:3030/api/auth/google/callback'
        },
        captcha: false
    },
    production: {
        rootPath: rootPath,
        //db: 'mongodb://admin:test@ds029541.mongolab.com:29541/scoolbry2',
        db: 'mongodb://admin:test@ds053109.mongolab.com:53109/scoolbry',
        port: process.env.PORT || 3030,
        facebook: {
            clientID: '1512522278997261',
            clientSecret: '95bfbb52c31bab56bedcb1011e617523',
            callbackURL: 'http://scoolbry.com/api/auth/facebook/callback'
        },

        twitter: {
            consumerKey       : 'dn1vIPB9VhWZcF7hYVDpJFyZd',
            consumerSecret    : '0vJOYrmYEnT8onw55aPwBXDPwNv0xpNXoWJVymFni6STfDzA9j',
            callbackURL       : 'http://scoolbry.com/api/auth/twitter/callback'
        },
        google : {
            clientID      : 'your-consumer-key-here',
            clientSecret  : 'your-client-secret-here',
            callbackURL   : 'http://localhost:3030/api/auth/google/callback'
        },
        captcha: true
    }
};
