'use strict';

app.factory('UsersRolesResource', function($http) {
	return {
		getRoles: function(){ 
			console.log('im in');
			$http.get('/api/roles')
				.success(function(data){
					console.log(data);
					return data;
				});
		}
	};
});