app.config(function ($stateProvider) {

    // Register our *about* state.
    $stateProvider.state('admin.adminOrder', {
        url: '/adminOrder',
        controller: 'AdminOrderController',
        templateUrl: 'js/admin/adminOrder/adminOrder.html'
    });
});

app.controller('AdminOrderController', function ($scope, OrderInfo, $state) {

		$scope.orders = '';
		$scope.statuses = ['all', 'complete', 'in progress', 'cancelled', 'cart'];
		$scope.chosenStatus = 'all';

		$scope.goToOrderDetail = function(order){
			$state.go('admin.adminOrder.edit', {orderId: order._id});
		}

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
				console.log(response.data);
				return response.data;
			})
		},
		getOneOrder: function(orderId){
			return $http.get('/api/order/' + orderId).then(function(response){
				return response.data;
			})
		},
		editOneOrder: function(order, statusChange){
			return $http.put('/api/order/' + order._id, statusChange).then(function(response){
				return response.data;
			})
		},
		order: {
			user: '',
			session: '',
			paymentMethod:{},
			address: {},
			dateOrdered: Date,
			dateShipped: Date,
			dateClosed: Date,
			status: '',
			finalCost: null,
			promo: ''

		}

	}

});

app.filter('byStatus', function(){
	return function(orders, status){
		if(status === 'all') return orders;
		else return _.where(orders, {status: status});
	}
})