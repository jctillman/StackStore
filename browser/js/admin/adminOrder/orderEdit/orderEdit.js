app.config(function ($stateProvider) {
    $stateProvider.state('admin.adminOrder.edit', {
        url: '/edit',
        controller: 'AdminOrderEditController',
        templateUrl: 'js/admin/adminOrder/orderEdit/orderEdit.html'
    });
});

app.controller('AdminOrderEditController', function($scope, OrderInfo){
	$scope.order = OrderInfo.order;

	$scope.status = '';

	$scope.submitOrderStat = function(order){
		var statChange = {status: $scope.status};
		OrderInfo.editOneOrder(order, statChange).then(function(order){
			console.log(order);
		});
	};

});
