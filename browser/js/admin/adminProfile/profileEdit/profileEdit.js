app.config(function ($stateProvider) {
    $stateProvider.state('admin.adminProfile.edit', {
        url: '/edit',
        controller: 'AdminProfileEditController',
        templateUrl: 'js/admin/adminProfile/profileEdit/profileEdit.html'
    });
});

app.controller('AdminProfileEditController', function($scope, UserInfo, OrderInfo){

	$scope.user = UserInfo.user;

	$scope.findUserOrder = function(order){
		console.log(order);
		//set factory injected into order controller's "order" to this order
	};

	console.log($scope.findUserOrder);

	$scope.updateUserInfo = function(user){
		var updatedUser = {password: user.password, admin: user.admin};
		UserInfo.changeUser(user, updatedUser).then(function(user){
		});
	};

});
