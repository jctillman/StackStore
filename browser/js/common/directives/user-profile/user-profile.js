app.directive('userProfile', function(OrderInfo){

	return {
		restrict: 'E',
		scope: {
			user: '=',
		},
		templateUrl: 'js/common/directives/user-profile/user-profile.html',
		link: function(scope, elem, attr){
			scope.userOrder = function(order){
				//or set OrderInfo.order to this order...
				OrderInfo.order = order;
				console.log(OrderInfo.order)
			}
		}
	};

});