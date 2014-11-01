'use strict';

app.directive('csvImport', function() {
	return {
		restrict: 'A',
		transclude: true,
		replace: true,
		scope:{
			content:'=',
			header: '=',
			headerVisible: '=',
			separator: '=',
			result: '='
		},
		template: '<h3 class="text-center">Import from CSV<div class="text-center col-xs-12"><input type="file" class="btn btn-info custom-file-input"></input></div></h3>',
		link: function(scope, element) {            
			element.on('keyup', function(){
				if ( scope.content !== null ) {
					var content = {
						csv: scope.content,
						header: scope.header
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
							csv: onLoadEvent.target.result,
							header: scope.header
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
							csv: scope.content,
							header: !scope.header
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

				var headers = [];
				if (content.header) {
					headers=lines[0].split(',');
					start = 1;
				}

				for (var i=start; i<lines.length; i++) {
					var obj = {};
					var currentline=lines[i].split(',');
					console.log(currentline);
					if ( currentline.length === columnCount ) {
						if (content.header) {
							for (var j=0; j<headers.length; j++) {
								obj[headers[j]] = currentline[j];
							}
						} else {
							for (var k=0; k<currentline.length; k++) {
								obj[k] = currentline[k];
							}
						}
						result.push(obj);
					}
				}
				return result;
			};
		}
	};
});