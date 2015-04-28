app.config(function ($stateProvider) {

    // Register our *about* state.
    $stateProvider.state('cart.purchased', {
        url: '/purchased',
        controller: 'PurchasedController',
        templateUrl: 'js/cart/purchased/purchased.html'
    })
});


app.controller('PurchasedController', function ($http, $rootScope, $scope, CartManager) {
	$scope.finished = false;

	$http.get('/api/cart/purchase').then(function(suc){
		console.log(suc);
		$scope.news = true;
		$scope.finished = true;
		console.log("ok...")
		$rootScope.$emit('addedItem');
	}).then(null, function(fail){
		$scope.news = false;
		$scope.finished = true;
		console.log("ok...");
		console.log(fail);
	})


});