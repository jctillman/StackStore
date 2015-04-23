'use strict';
app.directive('addProduct', function ($rootScope, $http) {

    return {
        restrict: 'E',
        scope: {product: '='},
        templateUrl: 'js/common/directives/add-product/add-product.html',
        link: function (scope, element, attrs) {

            var rs = $rootScope;

         	element.on('click',function(){
         		var url = 'api/order/addproduct/'+scope.product._id; 
         		$http.post(url)
         			.success(function(data, status, headers, config){
         				rs.$emit('addedItem');
         			})
         			.error(function(data, status, headers, config){
         				//do something
         			});
         	});    
        }
    };
});