app.config(function ($stateProvider) {

    // Register our *about* state.
    $stateProvider.state('cart.address', {
        url: '/address',
        controller: 'AddressController',
        templateUrl: 'js/cart/address/address.html'
    })
});

app.controller('AddressController', function ($scope, $state) {
	console.log("ASdasdasda");

	$scope.content = {};

	$scope.addAddressSingle = function(){
		if (!$scope.form.$valid){return 0;} //Need error-handling code}
		
		//Check if valid
			//If not, stop
		//Add to order
			//If failure, stop
		//Go to next elment.
	}

	$scope.addAddressDual = function(){
		if (!$scope.form.$valid){return 0;}//Need error-handling code}
		//Check if valid
			//If not, stop
		//Add to user's list of addresses
		//Add to order
			//If failure, stop
		//Go to next elment.
	}

});