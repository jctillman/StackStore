'use strict';
app.directive('checkoutAddress', function () {

    return {
        restrict: 'E',
        scope: {product: '='},
        templateUrl: 'js/common/directives/checkout-address/checkout-address.html',
        link: function (scope) {
            
        }
    };

});