app.directive('orderDetail', function(){
	return {
		restrict: 'E',
		templateUrl: 'js/common/directives/order-detail/order-detail.html',
		scope: {
			order: '='
		},
		link: function(scope, elem, attrs){

		}
	}
});