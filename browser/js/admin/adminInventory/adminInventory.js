app.config(function ($stateProvider) {

    // Register our *about* state.
    $stateProvider.state('admin.adminInventory', {
        url: '/adminInventory',
        controller: 'AdminInventoryController',
        templateUrl: 'js/admin/adminInventory/adminInventory.html',
        resolve: {
        	products: function(InventoryInfo){
        		return InventoryInfo.getAllProducts();
        	},
        	categories: function(InventoryInfo){
        		return InventoryInfo.getAllCategories();
        	}
        }
    });
});

app.controller('AdminInventoryController', function ($scope, InventoryInfo, $rootScope, $state, products, categories) {

	InventoryInfo.products = products;
	$scope.products = InventoryInfo.products;

	InventoryInfo.categories = InventoryInfo.filterCategories(categories);
	$scope.categories = InventoryInfo.categories;
	console.log($scope.categories);
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
			userVisible: ''
		}
		$state.go('admin.adminInventory.editProd', {editState: false})
	}


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


});

app.factory('InventoryInfo', function($http){

	return {
		getAllProducts: function(){
			return $http.get('/api/product/').then(function(response){
				return response.data;
			});
		},
		products: [],
		categories: [],
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
			userVisible: ''
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
