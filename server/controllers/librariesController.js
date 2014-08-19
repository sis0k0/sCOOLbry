var Library = require('mongoose').model('Library');

module.exports = {
    getAllLibraries: function(req, res, next) {
        Library.find({}).exec(function(err, collection) {
            if (err) {
                console.log('Libraries could not be loaded: ' + err);
            }

            res.send(collection);
        })
    },
    getLibraryById: function(req, res, next) {
        Library.findOne({_id: req.params.id}).exec(function(err, library) {
            if (err) {
                console.log('Library could not be loaded: ' + err);
            }

            res.send(library);
        })
    }
};
