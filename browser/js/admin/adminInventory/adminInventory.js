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
		$state.go('admin.adminInventory.editProd', {editState: true});
	}

	$scope.goToAdd = function(){
		InventoryInfo.product = {
			title: "",
			description: "",
			price: null,
			categories: [],
			photoUrls: [],
			splashPhoto: null,
			reviews: [],
		}
		$state.go('admin.adminInventory.editProd', {editState: false})
	}

	$scope.getProducts = function(){
		InventoryInfo.getAllProducts().then(function(products){
			$scope.products = products;
		})
	};


	$scope.getCategories = function(){
		InventoryInfo.getAllCategories().then(function(categories){
			$scope.categories = InventoryInfo.filterCategories(categories);
		});

	};

	$scope.goToCategoryEdit = function(category){
		InventoryInfo.category = category;
		$state.go('admin.adminInventory.editCat', {editCatState: true});
	};

	$scope.goToCategoryAdd = function(){
		InventoryInfo.category = {
			type: '',
			data: '',
			order: null
		}
		$state.go('admin.adminInventory.editCat', {editCatState: false});
	}

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
		},
		category: {
			type: '',
			data: '',
			order: null
		},
		filterCategories: function(arrCategories){
			var categoryTypes = _.uniq(arrCategories
													 .map(function(category){return {type: category.type, info: []}}), 
													 'type');
			
			var matchingData = [];
			categoryTypes.forEach(function(categoryType){
				matchingData = _.where(arrCategories, { 'type': categoryType.type });
				categoryType.info = categoryType.info.concat(matchingData);
			});

			return categoryTypes;
		}

	};


});
