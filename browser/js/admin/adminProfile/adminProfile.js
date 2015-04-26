app.config(function ($stateProvider, USER_ROLES) {

    // Register our *about* state.
    $stateProvider.state('admin.adminProfile', {
        url: '/adminProfile',
        controller: 'AdminProfileController',
        templateUrl: 'js/admin/adminProfile/adminProfile.html'
    });
});

app.controller('AdminProfileController', function ($scope, UserInfo, $state) {

	$scope.users = ['joe', 'smoe'];

	$scope.editUser = function(user){
		UserInfo.user = user;
		$state.go('admin.adminProfile.edit');
	}

	$scope.allUsers = function(){
		UserInfo.getAllUsers().then(function(users){
			$scope.users = users;
		})
	}

	$scope.allUsers();
    // ADD

});

app.factory('UserInfo', function($http){

	return {
		getAllUsers: function(){
			return $http.get('/api/user/').then(function(response){
				return response.data;
			})
		},
		createNewUser: function(newUser){
      return $http.post('/api/user/newUser', newUser).then(function(response){
          return response.data;
      });
	  },
	  prepareForUpdate: function(arrOfRefs){
	  	arrOfRefs.forEach(function(arr){
	  		return arr.map(function(elem){
	  			return elem._id;
	  		});
	  	});
	  },
	  user: {
	  	email: '',
	  	password: '',
	  	name: {
	  		first: '',
	  		middle: '',
	  		last: ''
	  	},
	  	orders: [],
	  	cart: '',
	  	addresses: [],
	  	reviews: [],
	  	admin: false
	  }

	}

});