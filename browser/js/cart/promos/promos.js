app.config(function ($stateProvider) {

    // Register our *about* state.
    $stateProvider.state('cart.promos', {
        url: '/promos',
        controller: 'PromosController',
        templateUrl: 'js/cart/promos/promos.html'
    });
});

app.controller('PromosController', function ($scope, CartManager) {


	$scope.added = "";

	$scope.addCode = function(){
		CartManager
			.setCart({promo: $scope.promo})
			.then(function(success){
				$scope.added = "Promo code added."
			})
			.then(null, function(err){
				$scope.added = "Something went wrong trying to add the code.  Please try again.";
			})
	}


});