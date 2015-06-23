'use strict';

var path     = require('path'),
    rootPath = path.normalize(__dirname + '/../../');

module.exports = {
    development: {
        rootPath: rootPath,
        db: 'mongodb://localhost/scoolbry',
        elasticHost: 'localhost:9200',
        port: process.env.PORT || 3030,
        facebook: {
            clientID: '1511950165721139',
            clientSecret: '50654ed9ad9c437720974dbe782949ed',
            callbackURL: 'http://localhost:3030/api/auth/facebook/callback'
        },

        twitter: {
            consumerKey       : 'dn1vIPB9VhWZcF7hYVDpJFyZd',
            consumerSecret    : '0vJOYrmYEnT8onw55aPwBXDPwNv0xpNXoWJVymFni6STfDzA9j',
            callbackURL       : 'http://localhost:3030/api/auth/twitter/callback'
        },
        google : {
            clientID      : '484372635324-edo18uemq1hh2lfad3sk9nibfhtupmmp.apps.googleusercontent.com',
            clientSecret  : 'rw3oReSmWYEEq9owOzGF6Ela',
            callbackURL   : 'http://localhost:3030/api/auth/google/callback'
        },
        captcha: false
    },
    production: {
        rootPath: rootPath,
       // elasticHost: 'localhost:9200',
        elasticHost: 'https://711fqwx7:p9azlyuf5unldabk@apricot-5221687.us-east-1.bonsai.io/',
        // db: 'mongodb://admin:test@ds041871.mongolab.com:41871/scoolbry-demo-2',

        // db: 'mongodb://admin:test@ds029541.mongolab.com:29541/scoolbry2',
        // db: 'mongodb://admin:test@ds053109.mongolab.com:53109/scoolbry',
        // db: 'mongodb://admin:test@ds043971.mongolab.com:43971/scoolbry-test',

        // DEMO
        // db: 'mongodb://admin:test@ds045097.mongolab.com:45097/scoolbry-testfordemo',
        // db: 'mongodb://admin:test@dbh13.mongolab.com:27137/scoolbry-demo',
        db: 'mongodb://admin:test@ds045027.mongolab.com:45027/test-demo-scoolbry',
        port: process.env.PORT || 3030,
        facebook: {
            clientID: '1511950165721139',
            clientSecret: '50654ed9ad9c437720974dbe782949ed',
            callbackURL: 'http://scoolbry.com/api/auth/facebook/callback'
        },

        twitter: {
            consumerKey       : 'dn1vIPB9VhWZcF7hYVDpJFyZd',
            consumerSecret    : '0vJOYrmYEnT8onw55aPwBXDPwNv0xpNXoWJVymFni6STfDzA9j',
            callbackURL       : 'http://scoolbry.com/api/auth/twitter/callback'
        },
        google : {
            clientID      : '484372635324-aqbk02go2mugeo393jmeci3dnj3r7r5e.apps.googleusercontent.com',
            clientSecret  : 'AUcxTWDjf458qlgWsDfPRg6n',
            callbackURL   : 'http://scoolbry.com/api/auth/google/callback'
        },
        captcha: true
    }
};
