app.config(function ($stateProvider) {
    $stateProvider.state('admin.adminOrder.edit', {
        url: '/:orderId',
        controller: 'AdminOrderEditController',
        templateUrl: 'js/admin/adminOrder/orderEdit/orderEdit.html',
        resolve: {
        	order: function(OrderInfo, $stateParams){
        		return OrderInfo.getOneOrder($stateParams.orderId);
        	}
        }
    });
});

app.controller('AdminOrderEditController', function($scope, OrderInfo, order){
	$scope.order = order;

	$scope.status = '';

	$scope.submitOrderStat = function(order){
		var statChange = {status: $scope.status};
		OrderInfo.editOneOrder(order, statChange).then(function(order){
			console.log(order);
		});
	};

});
