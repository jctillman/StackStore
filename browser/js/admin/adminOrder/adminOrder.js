app.config(function ($stateProvider) {

    // Register our *about* state.
    $stateProvider.state('admin.adminOrder', {
        url: '/adminOrder',
        controller: 'AdminOrderController',
        templateUrl: 'js/admin/adminOrder/adminOrder.html'
    });
});

app.controller('AdminOrderController', function ($scope, OrderInfo) {

		$scope.orders = '';
		$scope.statuses = ['all', 'complete', 'in progress', 'cancelled', 'cart'];
		$scope.chosenStatus = 'all';

		$scope.allOrders = function(){
			OrderInfo.getAllOrders().then(function(orders){
				$scope.orders = orders;
			})
		}

		$scope.changeStatus = function(status){
			$scope.chosenStatus = status;
		}

		$scope.allOrders();


});

app.factory('OrderInfo', function($http){

	return {

		getAllOrders: function(){
			return $http.get('/api/order/').then(function(response){
				return response.data;
			})
		},
		order: {

		}

	}

});

app.filter('byStatus', function(){
	return function(orders, status){
		if(status === 'all') return orders;
		else return _.where(orders, {status: status});
	}
})