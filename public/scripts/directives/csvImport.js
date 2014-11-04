'use strict';

app.directive('csvImport', function() {
	return {
		restrict: 'A',
		transclude: true,
		replace: true,
		scope:{
			content:'=',
			separator: '=',
			result: '='
		},
		template: '<h3 class="text-center">Import from CSV<div class="text-center col-xs-12"><input type="file" class="btn btn-info custom-file-input"></input></div></h3>',
		link: function(scope, element) {            
			element.on('keyup', function(){
				if ( scope.content !== null ) {
					var content = {
						csv: scope.content
					};
					scope.result = csvToJSON(content);
					scope.$apply();
				}
			});




			element.on('change', function(onChangeEvent) {
				var reader = new FileReader();
				reader.onload = function(onLoadEvent) {
					scope.$apply(function() {
						var content = {
							csv: onLoadEvent.target.result
						};

						scope.content = content.csv;
						scope.result = csvToJSON(content);
					});
				};
				if ( (onChangeEvent.target.type === 'file') && (onChangeEvent.target.files !== null || onChangeEvent.srcElement.files !== null) )  {
					reader.readAsText((onChangeEvent.srcElement || onChangeEvent.target).files[0]);
				} else {
					if ( scope.content !== null ) {
						var content = {
							csv: scope.content
						};
						scope.result = csvToJSON(content);
					}
				}
			});

			var csvToJSON = function(content) {
				var lines=content.csv.split('\n');
				var result = [];
				var start = 0;
				var columnCount = lines[0].split(',').length;

				for (var i=start; i<lines.length; i++) {
					var arr = [];
					var currentline=lines[i].split(',');
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