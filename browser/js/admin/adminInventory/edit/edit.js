app.config(function ($stateProvider) {
    // Register our *about* state.
    $stateProvider.state('admin.adminInventory.edit', {
        url: '/edit',
        controller: 'AdminInventoryEditController',
        templateUrl: 'js/admin/adminInventory/edit/edit.html'
    });
});


app.controller('AdminInventoryEditController', function($scope, InventoryInfo, ProductEdit, $rootScope){

	$scope.product = InventoryInfo.product;
	$scope.categories;

	$scope.deleteProduct = function(product){
		ProductEdit.removeProduct(product).then(function(deletedItem){
			$rootScope.$emit('deletedProduct');
		});
	}

	$scope.allCategories = function(){
		InventoryInfo.getAllCategories().then(function(categories){
			$scope.categories = categories;
		})
	}

});

app.factory('ProductEdit', function($http){

	return {
		removeProduct: function(product){
			return $http.delete('/api/product/' + product._id).then(function(response){
				return response.data;
			})
		}
	}

});