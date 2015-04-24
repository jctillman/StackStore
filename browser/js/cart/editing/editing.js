app.config(function ($stateProvider) {

    // Register our *about* state.
    $stateProvider.state('cart.editing', {
        url: '/editing',
        controller: 'EditingController',
        templateUrl: 'js/cart/editing/editing.html'
    })
});

app.controller('EditingController', function ($scope, $http, $rootScope) {

	var getItems = function(){
		$http.get('/api/order/lineItems')
			.success(function(data){
				console.log(data);
				$scope.items = data.items.lineItems;
				//console.log($scope.items);
			})
			.error(function(data){
				//console.log(data);
			});
		}
	getItems();

	$scope.modLine = function(lineItemId, num){
		$http.put('/api/order/lineItem/'+lineItemId, {number: num})
			.success(function(data){
				console.log(data);
				getItems();
				$rootScope.$emit('addedItem');
			});
	}

	$scope.removeFrom = function(lineItemId){

	}

});