'use strict';
app.directive('addProduct', function ($http) {

    return {
        restrict: 'E',
        scope: {product: '='},
        templateUrl: 'js/common/directives/add-product/add-product.html',
        link: function (scope, element, attrs) {
         	element.on('click',function(){
         		var url = 'api/order/addproduct/'+scope.product._id; 
         		$http.post(url)
         			.success(function(data, status, headers, config){
         				scope.$emit('addedItem');
         			})
         			.error(function(data, status, headers, config){
         				//do something
         			});
         	});    
        }
    };
});