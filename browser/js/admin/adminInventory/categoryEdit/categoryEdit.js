app.config(function ($stateProvider) {
    $stateProvider.state('admin.adminInventory.editCat', {
        url: '/:editCatState',
        controller: 'AdminCategoryEditController',
        templateUrl: 'js/admin/adminInventory/categoryEdit/categoryEdit.html'
    });
});


app.controller('AdminCategoryEditController', function($scope, $timeout, $state, InventoryInfo, CategoryEdit, $stateParams){
	$scope.category = InventoryInfo.category;
	$scope.category.newData = "";
	$scope.category.newType = $scope.category.type;

	$scope.editCategory;
	$scope.addCategory;

	$scope.dataSuccess = false;
	$scope.typeSuccess = false;
	$scope.deleteSuccess = false;


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

	//any way to make this more efficient?
	$scope.removeData = function(datum){
		CategoryEdit.deleteDatum(datum).then(function(deletedDatum){
			InventoryInfo.categories.forEach(function(elem){
				if(elem.type === deletedDatum.type){
					_.remove(elem.info, function(data){
						return data.data === deletedDatum.data;
					});
				}
			});
		});

	}

	$scope.addNewCategory = function(){
		var newCat = {type: $scope.category.newType, data: $scope.category.newData};
		CategoryEdit.newCategory(newCat).then(function(newCategory){
			InventoryInfo.categories.push({type: newCategory.type, info: [{data: newCategory.data}]});
			$state.go('admin.adminInventory');
		});
	};

	$scope.changeType = function(type, newType){
		var typeObj = {type: type, newType: newType};
		CategoryEdit.editCategoryType(typeObj).then(function(editedCategories){
			$scope.category.type = $scope.category.newType;
			$scope.typeSuccess = true;
		});
	};

	$scope.addDataEntry = function(type, data){
		var category = {type: type, data: data};
		CategoryEdit.newCategory(category).then(function(newCategory){
			InventoryInfo.categories.forEach(function(elem){
				if(elem.type === newCategory.type){
					elem.info.push(newCategory);
				}
			});
			$scope.dataSuccess = true;
		});
	};

	$scope.deleteCategory = function(){
		var categoryType = {type: $scope.category.type}
		CategoryEdit.deleteCategory(categoryType).then(function(){
			_.remove(InventoryInfo.categories, function(elem){
				return elem.type === $scope.category.type;
			});
			console.log(InventoryInfo.categories);
			$scope.deleteSuccess = true;
		})
	}

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
		},
		deleteCategory: function(category){
			return $http.delete('/api/category/', category).then(function(response){
				return response.data;
			});
		},
		deleteDatum: function(datum){
			return $http.delete('/api/category/' + datum._id).then(function(response){
				return response.data;
			});
		}
	}

});