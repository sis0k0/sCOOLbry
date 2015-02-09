'use strict';

module.exports = {

    createLibrarian: require('./createLibrarian'),
    createUser: require('./createUser'),
    deleteUserById: require('./deleteUserById'),
    getAllUsers: require('./getAllUsers'),
    getAllUsersSearchable: require('./getAllUsersSearchable'),
    getAllUsersSortable: require('./getAllUsersSortable'),
    getUserByEmail: require('./getUserByEmail'),
    getUserById: require('./getUserById'),
    getUserByShortId: require('./getUserByShortId'),
    getUserByUsername: require('./getUserByUsername'),
    getUserCount: require('./getUserCount'),
    getUserNotifications: require('./getUserNotifications'),
    updateUser: require('./updateUser'),
    uploadAvatar: require('./uploadAvatar'),
    validCaptcha: require('./validCaptcha')

};