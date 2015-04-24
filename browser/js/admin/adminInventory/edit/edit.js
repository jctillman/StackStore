app.config(function ($stateProvider) {
    // Register our *about* state.
    $stateProvider.state('admin.adminInventory.edit', {
        url: '/edit/:editProduct',
        controller: 'AdminInventoryEditController',
        templateUrl: 'js/admin/adminInventory/edit/edit.html'
    });
});


app.controller('AdminInventoryEditController', function($scope, $stateParams){

console.log('these are the state params', $stateParams);


	$scope.product = {
		title: "",
		description: "",
		price: null,
		categories: ['something', 'something else'],
		photoUrls: [],
		splashPhoto: null,
		reviews: [],
		promo: ''
	}

});