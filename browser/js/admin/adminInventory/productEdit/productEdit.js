app.config(function ($stateProvider) {
    // Register our *about* state.
    $stateProvider.state('admin.adminInventory.editProd', {
        url: '/:editState',
        controller: 'AdminProductEditController',
        templateUrl: 'js/admin/adminInventory/productEdit/productEdit.html'
    });
});


app.controller('AdminProductEditController', function($scope, InventoryInfo, ProductEdit, $rootScope, $stateParams){

	//ADD AN ASSOCIATED ID VALUE!!!!!!

	$scope.product = InventoryInfo.product;
	$scope.categories;
	$scope.categoryChoices = [];
	$scope.editPage;
	$scope.addPage;


	console.log(typeof $stateParams.editState);

	$scope.editingState = function(){
		console.log($stateParams.editState);
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
			$rootScope.$emit('deletedProduct'); //working??
		});
	}


	$scope.filterCategories = function(arrCategories){

		var categoryTypes = arrCategories
												.map(function(category){return {type: category.type, info: []}});
		var matchingData = [];

		categoryTypes.forEach(function(categoryType){
			matchingData = _.where(arrCategories, { 'type': categoryType.type });
			categoryType.info = categoryType.info.concat(matchingData);
		});
		console.log(categoryTypes);
		return categoryTypes;


	}

	$scope.updateProduct = function(){
		$scope.product.categories = $scope.categoryChoices;
		ProductEdit.updateProductById($scope.product).then(function(updatedProduct){
		})
	}

	$scope.addToCategories = function(category){
		$scope.categoryChoices.push(category.info[0]._id);
		console.log($scope.categoryChoices);

	}

	$scope.addNewProduct = function(){
		$scope.product.categories = $scope.categoryChoices;
		ProductEdit.addProduct($scope.product).then(function(product){
			console.log(product);
		});
	}

	$scope.allCategories = function(){
		InventoryInfo.getAllCategories().then(function(categories){
			console.log($scope.filterCategories(categories));
			$scope.categories = $scope.filterCategories(categories);
		})
	}

	$scope.allCategories();
	$scope.editingState();

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