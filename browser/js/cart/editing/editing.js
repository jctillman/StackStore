app.config(function ($stateProvider) {

    // Register our *about* state.
    $stateProvider.state('cart.editing', {
        url: '/editing',
        controller: 'EditingController',
        templateUrl: 'js/cart/editing/editing.html'
    })
});

app.controller('EditingController', function ($scope, $http, $rootScope, CartManager) {

	CartManager.getCart().then(function(cart){
		$scope.items = cart.lineItems;
		$scope.cart = cart;
	})

	$scope.modLine = function(index, quantity){
		if (quantity > 0){
			$scope.cart.lineItems[index].quantity = quantity;
		}else{
			$scope.cart.lineItems.splice(index,1);
		}
		console.log($scope.cart.lineItems);
		var sender = $scope.cart.lineItems.map(function(n){console.log(n); return {quantity: n.quantity, product: n.product._id}});
		console.log(sender);
		CartManager.setCart({lineItems: sender});
		$rootScope.$emit('addedItem');
	}

});