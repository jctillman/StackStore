'use strict';
app.directive('productLine', function ($rootScope, $state) {

    return {
        restrict: 'E',
        scope: {product: '='},
        templateUrl: 'js/common/directives/product-line/product-line.html',
        link: function (scope, element, attrs) {
           // $state.go('list.productDetail')
        }
    };

});