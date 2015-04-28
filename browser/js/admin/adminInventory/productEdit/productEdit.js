app.config(function ($stateProvider) {
    // Register our *about* state.
    $stateProvider.state('admin.adminInventory.editProd', {
        url: '/:editState',
        controller: 'AdminProductEditController',
        templateUrl: 'js/admin/adminInventory/productEdit/productEdit.html'
    });
});


app.controller('AdminProductEditController', function($scope, InventoryInfo, ProductEdit, $rootScope, $stateParams, $state){

	//add function for adding a photoUrl

	$scope.product = InventoryInfo.product;
	$scope.categories;
	$scope.categoryChoices = [];
	$scope.editPage;
	$scope.addPage;
	$scope.error = false;
	$scope.newCategory = {
		id: ''
	};

	console.log($scope.categoryChoices);
	

	$scope.getCategoryIds = function(arr){
		return arr.map(function(elem){
			return elem._id;
		});
	};


	$scope.editingProduct = function(){

		if($stateParams.editState == "true"){
			$scope.editPage = true;
			$scope.addPage = false;
		}
		else {
			$scope.editPage = false;
			$scope.addPage = true;
		}
	};

	$scope.deleteProduct = function(product){
		ProductEdit.removeProduct(product).then(function(deletedItem){
			_.remove(InventoryInfo.products, function(elem){
				return elem._id === deletedItem._id;
			});
			$state.go('admin.adminInventory');
		});
	};

	$scope.updateProduct = function(){
		$scope.product.categories = $scope.getCategoryIds($scope.product.categories)
																.concat($scope.categoryChoices);

		ProductEdit.updateProductById($scope.product).then(function(updatedProduct){
			$state.go('admin.adminInventory');
		});
	};

	$scope.addToCategories = function(category){
		var exists = _.find($scope.product.categories, function(elem){
				return elem.type === category.type
		});

		if(exists === undefined){
			if($scope.error) $scope.error = false;
			$scope.categoryChoices.push($scope.newCategory.id);
		}
		
		else $scope.error = true;	//create error message to alert user	
	};

	$scope.removeFromCategories = function(category){
		_.remove($scope.product.categories, function(elem){
			return elem.type === category.type;
		});
	};

	$scope.addNewProduct = function(){
		$scope.product.categories = $scope.categoryChoices;
		ProductEdit.addProduct($scope.product).then(function(product){
			InventoryInfo.products.push(product);
			$state.go('admin.adminInventory');
		});
	};

	$scope.allCategories = function(){
		InventoryInfo.getAllCategories().then(function(categories){
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