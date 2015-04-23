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

	

		$scope.allOrders = function(){
			OrderInfo.getAllOrders().then(function(orders){
				$scope.orders = orders;
			})
		}

			$scope.allOrders();
    // ADD

});

app.factory('OrderInfo', function($http){

	return {

		getAllOrders: function(){
			return $http.get('/api/order/').then(function(response){
				return response.data;
			})
		}

	}

});