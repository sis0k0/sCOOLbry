'use strict';

app.directive('databaseImport', function(notifier, XLSXReaderService) {
    return {
        restrict: 'E',
        transclude: true,
        replace: true,
        scope:{
            content:'=',
            separator: '=',
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

                var file = (onChangeEvent.srcElement || onChangeEvent.target).files[0],
                    extension = file.name.substring(file.name.lastIndexOf('.'));

                if(extension==='.csv') {
                    var reader = new FileReader();
                    reader.onload = function(onLoadEvent) {
                        scope.$apply(function() {
                            var content = {
                                csv: onLoadEvent.target.result
                            };
                            scope.content = content.csv;
                            scope.result = csvToArray(content);
                        });
                    };
                    if ( (onChangeEvent.target.type === 'file') && (onChangeEvent.target.files !== null || onChangeEvent.srcElement.files !== null) )  {
                        reader.readAsText(file);
                    } else {
                        if ( scope.content !== null ) {
                            var content = {
                                csv: scope.content
                            };
                            scope.result = csvToArray(content);
                        }
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
                    start = 0,
                    separator = '';


                if(lines[0].indexOf(',')!==-1 && lines[0].indexOf(',')>lines[0].indexOf(';')) {
                    separator = ',';
                } else {
                    separator = ';';
                }

                var columnCount = lines[0].split(separator).length;

                for (var i=start; i<lines.length; i++) {
                    var arr = [];
                    var currentline=lines[i].split(separator);
                    if ( currentline.length === columnCount ) {
                        for (var k=0; k<currentline.length; k++) {
                            arr.push(currentline[k]);
                        }
                        result.push(arr);
                    }
                }
                return result;
            };
        }
    };
});