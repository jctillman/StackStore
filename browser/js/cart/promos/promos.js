app.config(function ($stateProvider) {

    // Register our *about* state.
    $stateProvider.state('cart.promos', {
        url: '/promos',
        controller: 'PromosController',
        templateUrl: 'js/cart/promos/promos.html'
    })
});

app.controller('PromosController', function ($scope, CartManager) {



	$scope.addCode = function(){
		CartManager
			.setCart({promo: $scope.promo})
			.then(function(success){
				//something something it was set
			})
			.then(null, function(err){
				//Something something error
			})
	}


});