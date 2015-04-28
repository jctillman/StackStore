app.directive('userProfile', function(OrderInfo, $state){

	return {
		restrict: 'E',
		scope: {
			user: '=',
		},
		templateUrl: 'js/common/directives/user-profile/user-profile.html',
		link: function(scope, elem, attr){

			scope.hasOrder = scope.user.orders.length !== 0;
			scope.hasCart = scope.user.cart;

			scope.userOrder = function(order){
				if(typeof order === 'object') $state.go('user.orderEdit', {orderId: order._id});
				else {
						OrderInfo.getOneOrder(order).then(function(order){					
						$state.go('user.orderEdit', {orderId: order._id});
					})
				}
			}
		}
	};

});