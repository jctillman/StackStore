'use strict';
app.directive('productLine', function () {

    return {
        restrict: 'E',
        scope: {product: '='},
        templateUrl: 'js/common/directives/product-line/product-line.html',
        link: function (scope, element attrs) {
            
            var rs = $rootScope;

            element.on('click', function(){
            	var url = 'api/list/' + scope.product.title;
            	rs.go(url);
            })


        }
    };

});