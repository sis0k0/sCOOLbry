'use strict';

app.directive('csvImport', function(notifier) {
    return {
        restrict: 'A',
        transclude: true,
        replace: true,
        scope:{
            content:'=',
            separator: '=',
            result: '='
        },
        template: '<div class="col-md-4 text-center"><h3 class="text-center">Import from CSV</h3><div class="row"><input type="file" class="btn btn-info custom-file-input" style="margin-top:0"></input></div></div>',
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

                var type = onChangeEvent.target.files[0].type;
                var extension = onChangeEvent.target.files[0].name.substring(onChangeEvent.target.files[0].name.lastIndexOf('.'));

                var mimetype = type ? type : extension;
                if(mimetype==='application/vnd.ms-excel' || mimetype==='text/csv' || mimetype==='.csv') {
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
                        reader.readAsText((onChangeEvent.srcElement || onChangeEvent.target).files[0]);
                    } else {
                        if ( scope.content !== null ) {
                            var content = {
                                csv: scope.content
                            };
                            scope.result = csvToArray(content);
                        }
                    }
                } else {
                    notifier.error('Wrong file type! Please upload CSV file!');
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