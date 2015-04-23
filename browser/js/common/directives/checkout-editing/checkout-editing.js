'use strict';
app.directive('checkoutEditing', function ($http, CartFactory) {

    return {
        restrict: 'E',
        scope: {product: '='},
        templateUrl: 'js/common/directives/checkout-editing/checkout-editing.html',
        link: function (scope) {
            
        	scope.cart = null;
        	//var $http = $http;

        	function getCartContents(){
        		$http.get('api/lineitems')
        			.success(function(data, status, config, headers){
        				console.log(data);
        			})
        			.failure(function(data, status, config, headers){

        			});
        	}

        	getCartContents();


        }
    };

});