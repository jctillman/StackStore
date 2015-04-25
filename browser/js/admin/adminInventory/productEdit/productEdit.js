app.config(function ($stateProvider) {
    // Register our *about* state.
    $stateProvider.state('admin.adminInventory.editProd', {
        url: '/:editState',
        controller: 'AdminProductEditController',
        templateUrl: 'js/admin/adminInventory/productEdit/productEdit.html'
    });
});


app.controller('AdminProductEditController', function($scope, InventoryInfo, ProductEdit, $rootScope, $stateParams){


	$scope.product = InventoryInfo.product;
	$scope.categories;
	$scope.categoryChoices = [];
	$scope.editPage;
	$scope.addPage;


	$scope.editingProduct = function(){

		if($stateParams.editState == "true"){
			$scope.editPage = true;
			$scope.addPage = false;
		}
		else {
			console.log('im false');
			$scope.editPage = false;
			$scope.addPage = true;
		}

	}

	$scope.deleteProduct = function(product){
		ProductEdit.removeProduct(product).then(function(deletedItem){

		});
	}

	$scope.updateProduct = function(){
		$scope.product.categories = $scope.categoryChoices;
		ProductEdit.updateProductById($scope.product).then(function(updatedProduct){
		})
	}

	$scope.addToCategories = function(category){
		$scope.categoryChoices.push(category.info[0]._id);
	}

	$scope.addNewProduct = function(){
		$scope.product.categories = $scope.categoryChoices;
		ProductEdit.addProduct($scope.product).then(function(product){
			console.log(product);
		});
	}

	$scope.allCategories = function(){
		InventoryInfo.getAllCategories().then(function(categories){
			console.log(InventoryInfo.filterCategories(categories));
			$scope.categories = InventoryInfo.filterCategories(categories);
		})
	}

	$scope.allCategories();
	$scope.editingProduct();

});

app.factory('ProductEdit', function($http){

	return {
		removeProduct: function(product){
			return $http.delete('/api/product/' + product._id).then(function(response){
				return response.data;
			})
		},
		updateProductById: function(product){
			return $http.put('/api/product/' + product._id, product).then(function(response){
				return response.data;
			});
		},
		addProduct: function(product){
			return $http.post('/api/product/newProduct', product).then(function(response){
				return response.data;
			});
		}
	}

});