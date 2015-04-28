app.config(function ($stateProvider) {
    $stateProvider.state('user.orderEdit', {
        url: '/:orderId',
        controller: 'UserOrderEditController',
        templateUrl: 'js/user/userOrderEdit/userOrderEdit.html',
        resolve: {
        	order: function(OrderInfo, $stateParams){
        		return OrderInfo.getOneOrder($stateParams.orderId);
        	}
        }
    });
});

app.controller('UserOrderEditController', function($scope, OrderInfo, order){
	$scope.order = order;
});