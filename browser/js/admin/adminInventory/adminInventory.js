app.config(function ($stateProvider) {

    // Register our *about* state.
    $stateProvider.state('admin.adminInventory', {
        url: '/adminInventory',
        controller: 'AdminInventoryController',
        templateUrl: 'js/admin/adminInventory/adminInventory.html'
    });
});

app.controller('AdminInventoryController', function ($scope, InventoryInfo, $rootScope, $state) {

	$scope.products;
	$scope.categories;

	$scope.goToEdit = function(product){
		InventoryInfo.product = product;
		$state.go('admin.adminInventory.edit');
	}

	$scope.getProducts = function(){
		InventoryInfo.getAllProducts().then(function(products){
			$scope.products = products;
		})
	};

	$scope.getCategories = function(){
		InventoryInfo.getAllCategories().then(function(categories){
			$scope.categories = categories;
		});

	};

	$scope.enterEdit = function(){
		$scope.editing = true;
	}

	$rootScope.$on('deletedProduct', $scope.$digest);

	$scope.getProducts();
	$scope.getCategories();



});

app.factory('InventoryInfo', function($http){

	return {
		getAllProducts: function(){
			return $http.get('/api/product/').then(function(response){
				return response.data;
			});
		},
		getAllCategories: function(){
			return $http.get('/api/category/').then(function(response){
				return response.data;
			});
		},
		product: {
			title: "",
			description: "",
			price: null,
			categories: [],
			photoUrls: [],
			splashPhoto: null,
			reviews: [],
			promo: ''		
		}

	}


});