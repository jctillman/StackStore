app.config(function ($stateProvider) {

    // Register our *about* state.
    $stateProvider.state('cart.address', {
        url: '/address',
        controller: 'AddressController',
        templateUrl: 'js/cart/address/address.html'
    })
});

app.controller('AddressController', function ($http, $scope, $state, CartManager) {

	$scope.content = {};
	$scope.hasUser = false;

	$scope.pushAddr = function(addr){
        $scope.content = addr;
	};

	CartManager.getUser().then(function(user){
		$scope.addresses = user.addresses.map(function(n){return n;});
		$scope.hasUser = true;
	})

	CartManager.getCart().then(function(cart){
		$scope.content = cart.address;
	});


	$scope.addAddressSingle = function(){
		if ($scope.form.$valid){
			CartManager.setCart({address: $scope.content})
				.then(function(success){console.log("Cart set..."); $state.go('cart.payment');})
				.then(null, function(err){console.log("Some error happened somewhere");});
			}else{
				//something was invalid.
			}
	}

	$scope.addAddressDual = function(){
		if ($scope.form.$valid){
			CartManager.setCart({address: $scope.content})
				.then(function(currentStatus){
					console.log("Cart set...")
					return CartManager.setUser({$push : {addresses: $scope.content}});
				})
				.then(function(success){
					$state.go('cart.payment');
				})
				.then(null, function(err){
					console.log(err);
					console.log("Some error happened somewhere");
				});
		}else{
			//something was invalid
		}
	}

});