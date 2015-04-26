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

	var stripeResponseHandler = function(status, response){
		if(status===200){
			console.log("STATUS", status)
			console.log("RESPONSE", response);
			var payment = { type: "Stripe", stripeToken: response.id};
			CartManager
				.setCart({paymentMethod: payment})
				.then(function(suc){
					//let's go to the confirmation page.
					console.log(suc);
					$state.go('cart.promos');
				})
				.then(null, function(err){
					//something went wrong trying to save card values.
				});
		}else{
			//something went wrong trying to process the card.
		}
	};

	$scope.submit = function(){
		Stripe.card.createToken($scope.card, stripeResponseHandler)
	};

});