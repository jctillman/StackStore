app.config(function ($stateProvider) {
    $stateProvider.state('admin.adminInventory.editCat', {
        url: '/:editCatState',
        controller: 'AdminCategoryEditController',
        templateUrl: 'js/admin/adminInventory/categoryEdit/categoryEdit.html'
    });
});


app.controller('AdminCategoryEditController', function($scope, InventoryInfo, CategoryEdit, $stateParams){
	$scope.category = InventoryInfo.category;
	$scope.category.newData = "";
	$scope.category.newType = $scope.category.type;

	$scope.editCategory;
	$scope.addCategory;


	$scope.editingProduct = function(){

		//nicer way to do this??
		if($stateParams.editCatState == "true"){
			$scope.editCategory = true;
			$scope.addCategory = false;
		}
		else {
			$scope.editCategory = false;
			$scope.addCategory = true;
		}

	}

	//scope function to change category type should set type to newtype afterwards

	$scope.addNewCategory = function(){
		CategoryEdit.newCategory($scope.category).then(function(newCategory){
			console.log(newCategory);
		});
	};

	$scope.changeType = function(type, newType){
		var typeObj = {type: type, newType: newType};
		CategoryEdit.editCategoryType(typeObj).then(function(editedCategories){
			$scope.category.type = $scope.category.newType;
		});

	};

	$scope.addDataEntry = function(type, data){
		var category = {type: type, data: data};
		CategoryEdit.newCategory(category).then(function(newCategory){
			console.log(newCategory);
		});

	};

	$scope.editingProduct();
	
});

app.factory('CategoryEdit', function($http){

	return {
		newCategory: function(category){
			return $http.post('/api/category/newCategory', category).then(function(response){
				return response.data;
			});
		},
		editCategoryType: function(typeObj){
			return $http.put('/api/category/', typeObj).then(function(response){
				return response.data;
			})
		}
	}

});