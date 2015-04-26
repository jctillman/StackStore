app.directive('userProfile', function(OrderInfo, $state){

	return {
		restrict: 'E',
		scope: {
			user: '=',
		},
		templateUrl: 'js/common/directives/user-profile/user-profile.html',
		link: function(scope, elem, attr){
			scope.userOrder = function(order){
				OrderInfo.getOneOrder(order).then(function(order){
					OrderInfo.order = order;
					$state.go('user.orderEdit');
				})
			}
		}
	};

});