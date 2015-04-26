app.config(function ($stateProvider) {
    $stateProvider.state('user.orderEdit', {
        url: '/orderEdit',
        controller: 'UserOrderEditController',
        templateUrl: 'js/user/userOrderEdit/userOrderEdit.html'
    });
});

app.controller('UserOrderEditController', function($scope, OrderInfo){
	$scope.order = OrderInfo.order
});