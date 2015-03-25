(function(undefined) {
    'use strict';
    // Check if dependecies are available.
    if (typeof XLS === 'undefined') {
        console.log('xls.js is required. Get it from https://github.com/SheetJS/js-xls');
        return;
    }
 
    if (typeof _ === 'undefined') {
        console.log('Lodash.js is required. Get it from http://lodash.com/');
        return;
    }
 
    // Baseline setup
    // --------------
 
    // Establish the root object, `window` in the browser, or `exports` on the server.
    var root = this;
 
    // Save the previous value of the `XLSReader` variable.
    var previousXLSReader = root.XLSReader;
 
 
    // Create a safe reference to the XLSReader object for use below.
    var XLSReader = function(file, readCells, toJSON, handler) {
        var obj = {};
        XLSReader.utils.intializeFromFile(obj, file, readCells, toJSON, handler);
        return obj;
    }
 
    // Export the XLSReader object for **Node.js**, with
    // backwards-compatibility for the old `require()` API. If we're in
    // the browser, add `XLSReader` as a global object via a string identifier,
    // for Closure Compiler 'advanced' mode.
    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = XLSReader;
        }
        exports.XLSReader = XLSReader;
    } else {
        root.XLSReader = XLSReader;
    }
 
    // Current version.
    XLSReader.VERSION = '0.0.1';
 
    XLSReader.utils = {
        'intializeFromFile': function(obj, file, readCells, toJSON, handler) {


            var reader = new FileReader();

            reader.onload = function(e) {
                var data = e.target.result;
                var workbook = XLS.read(data, {
                    type: 'binary'
                });
 
                obj.sheets = XLSReader.utils.parseWorkbook(workbook, readCells, toJSON);
                handler(obj);
            }
            reader.readAsBinaryString(file);
        },
        'parseWorkbook': function(workbook, readCells, toJSON) {
            console.log('parse');
            if (toJSON === true) {
                return XLSReader.utils.to_json(workbook);
            }
 
            var sheets = {};
 
            _.forEachRight(workbook.SheetNames, function(sheetName) {
                var sheet = workbook.Sheets[sheetName];
                sheets[sheetName] = XLSReader.utils.parseSheet(sheet, readCells);
            });

 
            return sheets;
        },
        'parseSheet': function(sheet, readCells) {
            console.log('parseSheet');
            var range = XLS.utils.decode_range(sheet['!ref']);
            var sheetData = [];
 
            if (readCells === true) {
                _.forEachRight(_.range(range.s.r, range.e.r + 1), function(row) {
                    var rowData = [];
                    _.forEachRight(_.range(range.s.c, range.e.c + 1), function(column) {
                        var cellIndex = XLS.utils.encode_cell({
                            'c': column,
                            'r': row
                        });
                        var cell = sheet[cellIndex];
                        rowData[column] = cell ? cell.v : undefined;
                    });
                    sheetData[row] = rowData;
                });
            }
            return {
                'data': sheetData,
                'name': sheet.name,
                'col_size': range.e.c + 1,
                'row_size': range.e.r + 1
            }
        },
        to_json: function(workbook) {
            var result = {};
            workbook.SheetNames.forEach(function(sheetName) {
                var roa = XLS.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
                if (roa.length > 0) {
                    result[sheetName] = roa;
                }
            });
            return result;
        }
    }
}).call(this);