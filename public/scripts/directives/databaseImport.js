'use strict';

app.directive('databaseImport', function(notifier, XLSXReaderService) {
    return {
        restrict: 'E',
        transclude: true,
        replace: true,
        scope:{
            content:'=',
            result: '='
        },
        templateUrl: '../../views/directive-templates/databaseImport.html',
        link: function(scope, element) {            
            element.on('keyup', function(){
                if ( scope.content !== null ) {
                    var content = {
                        csv: scope.content
                    };
                    scope.result = csvToArray(content);
                    scope.$apply();
                }
            });

            element.on('change', function(onChangeEvent) {

                var file = (onChangeEvent.srcElement || onChangeEvent.target).files[0], // Get target file
                    extension = file.name.substring(file.name.lastIndexOf('.')); // Target file extension (mimetypes are not well specified for excel files)

                if(extension==='.csv') { // If the file is CSV type
                    var reader = new FileReader();
                    reader.onload = function(onLoadEvent) { // When the FileReader loads
                        scope.$apply(function() {
                            var content = {
                                csv: onLoadEvent.target.result // Get the file content
                            };
                            scope.content = content.csv;
                            scope.result = csvToArray(content); // And read it line by line
                        });
                    };
                    if ( (onChangeEvent.target.type === 'file') && (onChangeEvent.target.files !== null || onChangeEvent.srcElement.files !== null) )  {
                        reader.readAsText(file); // Read file as text (line by line)
                    } else if(scope.content !== null) {
                        var content = {
                            csv: scope.content
                        };
                        scope.result = csvToArray(content);
                    }
                } else if(extension==='.xlsx') {
                    console.log(onChangeEvent.target);
                    XLSXReaderService.readFile(file, true).then(function(xlsxData) {
                        console.log(xlsxData);
                        scope.result = xlsxData;
                    });
                } else {
                    notifier.error('Wrong file type! Please upload CSV or XSLX file!');
                }

            });

            var csvToArray = function(content) {
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
                        for (var j=0; j<columnCount; j++) { // Add only the first "columnCount" words
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