'use strict';
    
var Book          = require('mongoose').model('Book'),
    LibraryBook   = require('mongoose').model('LibBook'),
    fs            = require('fs'),
    Converter     = require('csvtojson').core.Converter,
    XLS           = require('xlsjs'),
    XLSX          = require('xlsx'),
    ObjectId      = require('mongoose').Types.ObjectId,
    ePub          = require('epub'),
    elasticsearch = require('elasticsearch');

var env = process.env.NODE_ENV || 'production';
var config = require('../config/config')[env];


function fileToJSON(file, sheet, callback) {
    /*jshint camelcase: false */

    if(file.extension==='xls') {

        // If the sheet is not specified
        if(typeof sheet === 'undefined') {
            return callback('No sheet specified');
        }

        // Get the workbook, select the sheet and parse it using the xls parser
        var workbook = XLS.readFile(file.path),
            sheet    = workbook.Sheets[sheet],
            json     = XLS.utils.sheet_to_json(sheet);

        return callback(null, json);

    } else if(file.extension==='xlsx') {

        // If the sheet is not specified
        if(typeof sheet === 'undefined') {
            return callback('No sheet specified');
        }

        // Get the workbook, select the sheet and parse it using the xlsx parser
        var workbook = XLSX.readFile(file.path),
            sheet    = workbook.Sheets[sheet],
            json     = XLSX.utils.sheet_to_json(sheet);

        return callback(null, json);
    } else if(file.extension==='csv') {
        var fileStream = fs.createReadStream(file.path);
        // New converter instance 
        var csvConverter = new Converter({constructResult:true});
         
        // end_parsed will be emitted once parsing finished 
        csvConverter.on('end_parsed',function(json){
           return callback(null, json);
        });
         
        // Read from file 
        fileStream.pipe(csvConverter);
    } else {
        return callback('Unsupported filetype');
    }

    /*jshint camelcase: true */
}

function jsonToBooks(includeTopRow, json, paths) {
    var books = []; // Define the books array

    for(var i = (includeTopRow) ? 0 : 1; i<json.length; i++) {
        var book = {};
        for(var prop in paths) {
            if(typeof json[i][paths[prop]] !== 'undefined') {


                // Make isbn field a string - it's a number if parsed from csv
                if(paths[prop].toString() === 'isbn') {
                    json[i][paths[prop]] = json[i][paths[prop]].toString();
                }

                book[prop] = json[i][paths[prop]];
            }
        }
        books.push(book);
    }

    return books;
}

function getBooks(file, matches, includeTopRow, sheet, callback) {
    // Parse file to json
    fileToJSON(file, sheet, function(err, json) {
        if(err) {
            return callback(err);
        } else {
            // Parse matches to object
            matches = JSON.parse(matches);
            // Parse json to schema defined books
            var books = jsonToBooks(includeTopRow, json, matches);
            return callback(null, books);
        }
    });
}

function runValidations(books, isLibraryBook) {
    // var errors = []; // Errors array
    var paths = Book.schema.paths; // All schema paths

    var requiredPaths = []; // Array with required paths
    for(var key in paths) {
        if(paths[key].isRequired) {
            requiredPaths.push(paths[key]);
        }
    }

    // If we're gonna add a library book, the total is required
    if(isLibraryBook) {
        requiredPaths.push({path: 'total'});
    }

    var failedValidation = []; // array with books that failed the validations
    var flag = false;
    var i = books.length;

    booksIteration:
        while(i--) {

            // check if all required paths are contained
            for(var key in requiredPaths) {
                if(typeof books[i][requiredPaths[key].path] === 'undefined') {
                    failedValidation.push(books[i]);
                    books.splice(i, 1);
                    continue booksIteration;
                }
            }

            // check if all validations are passed
            for(var j in paths) {
                var field = books[i][paths[j].path];
                if(typeof field !== 'undefined') {
                    for(var k=0; k<paths[j].validators.length; k++) {
                        var validator = paths[j].validators[k];
                        if(validator.type === 'required') {
                            continue;
                        }
                        if(!validator.validator(field)) { // if the validation fails
                            failedValidation.push(books[i]);
                            books.splice(i, 1);
                            continue booksIteration;
                        }
                    }
                }
            }

            // if there are any errors with the book, exclude it from the array
            if(flag) {
                failedValidation.push(books[i]);
                books.splice(i, 1);
            }
        }

    return {
        books: books,
        failed: failedValidation
    };
}

var importBooks = function(file, matches, includeTopRow, sheet, isLibraryBook, callback) {

    // Get books
    getBooks(file, matches, includeTopRow, sheet, function(err, books) {
        if(err) {
            return callback(err);
        } else {

            // Validate result
            var result = runValidations(books, isLibraryBook);
            books = result.books;
            var error = {
                failed: result.failed
            };

            if(books.length) {

                // Perform bulk import to the database
                var bulk = Book.collection.initializeUnorderedBulkOp();

                books.forEach(function(book) {
                    bulk.insert(book);
                });

                bulk.execute(function(err, results) {
                    if(err) {
                        console.log(err);
                        error.reason = err;
                        return callback(error);
                    }
                    // console.log(JSON.stringify(results, undefined, 4));

                    // Get errs and return results
                    results = results.toJSON();
                    var errs = results.writeErrors;
                    error.isbnExists = [];

                    errs.forEach(function(err) {
                        var failedBook = err.toJSON().op;
                        delete failedBook._id;
                        error.isbnExists.push(failedBook);
                    });
                    return (error && (error.reason || (error.failed && error.failed.length) || (error.isbnExists && error.isbnExists.length))) ? callback(error, books) : callback(null, books);   
                });
            } else {
                return (error && (error.reason || (error.failed && error.failed.length) || (error.isbnExists && error.isbnExists.length))) ? callback(error, books) : callback(null, books);   
            }


        }
    });
};

function parseEbook(eBookURL, callback) {
    var epub = new ePub(eBookURL);

    epub.on('error', function (err) {
        console.log('err');
        console.log(err);
        return callback(err);
    });

    epub.on('end', function () {

        console.log('end');

        var content = '',
            htmlCut = /(<([^>]+)>)/ig,
            chapterCounter = 0;

        epub.flow.forEach(function(chapter){
            epub.getChapterRaw(chapter.id, function(err, text) {
                chapterCounter++;

                if(err) {
                    return callback(err);
                } else {

                    // Get only the text contents of the chapter
                    text = (text.indexOf('<body')>-1) ? text.substring(text.indexOf('<body'), text.lastIndexOf('</body')) : text; // Only the text within the body tag
                    text = text.replace(htmlCut, ''); // Remove the tags
                    text = text.trim(); // Remove whitespaces

                    content = content.concat(text);

                    if(chapterCounter===epub.flow.length) { // If all chapters are iterated, return them
                        return callback(null, content);
                    }
                }
            });

        });


    });

    epub.parse();
}

function addEbookIndex(bookID, text, callback) {
    /*jshint camelcase: false */

    var client = new elasticsearch.Client({
        host: config.elasticHost,
        log: 'trace'
    });

    client.index({
        index: 'ebook',
        type: 'string',
        analyzer: 'whitespace',
        body: {
            id: bookID,
            text: text,
            index_options: 'offsets'
        }
    }, function (error, response) {
        if(error || !response) {
            console.log(error);
            console.log('Index couldn\'t be created!');
            return callback(error);
        } else {
            console.log('Index created!');
            return callback();
        }
    }, function(err) {
        return callback(err);
    });
}

module.exports = {
    importBooks: importBooks,
    importLibraryBooks : function(file, matches, includeTopRow, sheet, libraryID, callback) {

        // Import books
        importBooks(file, matches, includeTopRow, sheet, true, function(bookErrors, books) {

            if(bookErrors && bookErrors.reason) {
                return callback(bookErrors);
            } else {

                // Convert LibraryID to objectID
                libraryID = new ObjectId(libraryID);

                // Get failed books isbns
                var isbnNumbers   = [],
                    existingBooks = [],
                    i = books.length;

                // Iterate the books array reversed
                while(i--) {
                    if(!books[i]._id) {
                        isbnNumbers.push(books[i].isbn);
                        existingBooks.push(books[i]);
                        books.splice(i, 1);
                    }
                }

                // Get books ids
                Book
                .find({
                    isbn: {
                        $in: isbnNumbers
                    }
                })
                .select('_id isbn title')
                .exec(function(findBookErrors, foundBooks) {
                    if(findBookErrors) {
                        return callback(findBookErrors);
                    } else {

                        var libraryBooks = [];

                        // Create library books
                        foundBooks.forEach(function(book, index) {
                            libraryBooks.push({
                                bookID: book._id,
                                bookISBN: book.isbn,
                                bookName: book.title,
                                libraryID: libraryID,
                                total: existingBooks[index].total,
                                available: existingBooks[index].total
                            });
                        });

                        books.forEach(function(book) {
                            libraryBooks.push({
                                bookID: book._id,
                                bookISBN: book.isbn,
                                bookName: book.title,
                                libraryID: libraryID,
                                total: book.total,
                                available: book.total
                            });
                        });

                        // Import library books

                        // Perform bulk import to the database
                        if(libraryBooks.length) {
                            var bulk = LibraryBook.collection.initializeUnorderedBulkOp();

                            libraryBooks.forEach(function(book) {
                                bulk.insert(book);
                            });

                            bulk.execute(function(err, results) {
                                if(err) {
                                    console.log(err);
                                    bookErrors = bookErrors || {};
                                    bookErrors.reason = 'Mongo error. Please try again later';
                                    return callback(bookErrors);
                                }
                                // console.log(JSON.stringify(results, undefined, 4));

                                // Get errs and return results
                                results = results.toJSON();
                                var errs = results.writeErrors;
                                bookErrors = bookErrors || {};
                                bookErrors.isbnExists = [];

                                errs.forEach(function(err) {
                                    var failedBook = err.toJSON().op;
                                    delete failedBook._id;
                                    bookErrors.isbnExists.push(failedBook);
                                });

                                return (bookErrors && (bookErrors.reason || (bookErrors.failed && bookErrors.failed.length) || (bookErrors.isbnExists && bookErrors.isbnExists.length))) ? callback(bookErrors, libraryBooks) : callback(null, libraryBooks);
                            });
                            
                        } else {
                        return (bookErrors && (bookErrors.reason || (bookErrors.failed && bookErrors.failed.length) || (bookErrors.isbnExists && bookErrors.isbnExists.length))) ? callback(bookErrors, libraryBooks) : callback(null, libraryBooks);   
                        }
                    }
                });

            }

        });
    },
    indexEbook: function(bookID, eBookURL, callback) {
        parseEbook(eBookURL, function(err, content) {
            if(err) {
                return callback({reason: err});
            } else {
                addEbookIndex(bookID, content, function(err) {
                    if(err) {
                        return callback({reason: 'Index cannot be added'});
                    } else {
                        return callback();
                    }
                });
            }
        });
    }
};
