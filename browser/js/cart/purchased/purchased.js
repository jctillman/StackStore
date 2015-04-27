app.config(function ($stateProvider) {

    // Register our *about* state.
    $stateProvider.state('cart.purchased', {
        url: '/purchased',
        controller: 'PurchasedController',
        templateUrl: 'js/cart/purchased/purchased.html'
    })
});


app.controller('PurchasedController', function ($http, $rootScope, $scope, CartManager) {

	$http.get('/api/cart/purchase').then(function(suc){
		console.log(suc);
		$rootScope.$emit('addedItem');
		$scope.news = true;
	}).then(null, function(fail){
		$scope.news = false;
		console.log(fail);
	})


});