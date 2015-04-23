'use strict';
app.directive('productLine', function () {

    return {
        restrict: 'E',
        scope: {product: '='},
        templateUrl: 'js/common/directives/product-line/product-line.html',
        link: function (scope) {
            


        }
    };

});