app.config(function ($stateProvider) {

    // Register our *about* state.
    $stateProvider.state('cart.payment', {
        url: '/payment',
        controller: 'PaymentController',
        templateUrl: 'js/cart/payment/payment.html'
    })
});


app.controller('PaymentController', function ($state, $scope, CartManager) {

	$scope.submitting = false;
	$scope.card = {};
	$scope.hasCard = "";
	$scope.error = "";

	
	CartManager.getCart().then(function(cart){
		if (cart.paymentMethod && cart.paymentMethod.stripeToken){$scope.hasCard = "Credit card attached."}
	});

	var stripeResponseHandler = function(status, response){
		if(status===200){
			var payment = { type: "Stripe", stripeToken: response.id};
			CartManager
				.setCart({paymentMethod: payment})
				.then(function(suc){
					$scope.hasCard = "Success saving new payment method";
				})
				.then(null, function(err){
					console.log("Error saving");
					$scope.error = "Something went wrong trying to save the credit card.  Please try again."
					//$scope.$digest();
				});
		}else{
			console.log("Error processing")
			$scope.error = "Something went wrong trying to process the credit card.  Please try again."
			//$scope.$digest();
		}
	};

	$scope.submit = function(){
		Stripe.card.createToken($scope.card, stripeResponseHandler)
	};

});