'use strict';

app.directive('databaseImport', function(notifier, XLSXReaderService, XLSReaderService) {
    return {
        restrict: 'E',
        transclude: true,
        replace: true,
        scope:{
            content:'=',
            result: '=',
            file: '='
        },
        templateUrl: '../../views/directive-templates/databaseImport.html',
        link: function(scope, element) { 

            element.on('keyup', function(){
                if ( scope.content !== null ) {
                    var content = {
                        csv: scope.content
                    };
                    console.log('element');
                    console.log(element);
                    scope.result = csvToArray(content);
                    scope.$apply();
                }
            });

            element.on('change', function(onChangeEvent) {

                console.log('evenet');
                console.log(scope.import);
                console.log(scope.database);
                console.log(onChangeEvent);

                //     $('img').fadeIn('fast').attr('src', URL.createObjectURL(onChangeEvent.target.files[0]));

                //     $('#disp_tmp_path').html('Temporary Path(Copy it and try pasting it in browser address bar) --> <strong>['+tmppath+']</strong>');
                // });

                var file = (onChangeEvent.srcElement || onChangeEvent.target).files[0], // Get target file
                    extension = file.name.substring(file.name.lastIndexOf('.')); // Target file extension (mimetypes are not well specified for excel files)
                // var tmppath = URL.createObjectURL(file);
                // console.log(tmppath);

                if(extension==='.csv') { // If the file is CSV type
                    var reader = new FileReader();
                    reader.onload = function(onLoadEvent) { // When the FileReader loads
                        scope.$apply(function() {
                            var content = {
                                csv: onLoadEvent.target.result // Get the file content
                            };
                            scope.content = content.csv;
                            scope.result = csvToArray(content); // And read it line by line
                            scope.file = file;
                        });
                    };
                    if ( (onChangeEvent.target.type === 'file') && (onChangeEvent.target.files !== null || onChangeEvent.srcElement.files !== null) )  {
                        reader.readAsText(file); // Read file as text (line by line)
                    } else if(scope.content !== null) {
                        var content = {
                            csv: scope.content
                        };
                        scope.result = csvToArray(content);
                        scope.file = file;
                    }
                } else if(extension==='.xlsx') {
                    XLSXReaderService.readFile(file, true).then(function(xlsxData) {
                        scope.result = xlsxData;
                        scope.file = file;
                    });
                } else if(extension==='.xls') {
                    XLSReaderService.readFile(file, true).then(function(xlsData) {
                        scope.result = xlsData;
                        scope.file = file;
                    });
                } else {
                    notifier.error('Wrong file type! Please upload CSV, XLS or XSLX file!');
                }

            });

            var csvToArray = function(content) {
                content.csv = content.csv.replace('\r\n', '\n').replace('\r', '\n');
                var lines = content.csv.split('\n'),
                    result = [],
                    separator = (lines[0].indexOf(',')!==-1 && lines[0].indexOf(',')>lines[0].indexOf(';')) ? ',' : ';', // Get the separator
                    columnCount = lines[0].split(separator).length;

                for (var i=0; i<lines.length; i++) { // Iterate through the lines
                    var currentlineWords=lines[i].split(separator); // Get current line words
                    if (currentlineWords.length <= columnCount) { // If words count is equal or lower than the columns count
                        result.push(currentlineWords); // Add them to the result
                    } else { // If words count is greater than the columns count
                        var shrinkedWords = [];
                        for (var j=0; j<columnCount; j++) { // Add only the first 'columnCount' words
                            shrinkedWords.push(currentlineWords[j]);
                        }
                        result.push(shrinkedWords);
                    }
                }
                return result;
            };
        }
    };
});