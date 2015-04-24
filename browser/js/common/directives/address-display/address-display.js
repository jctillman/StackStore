'use strict';
app.directive('addressDisplay', function ($rootScope, $http) {

    return {
        restrict: 'E',
        scope: {address: '='},
        templateUrl: 'js/common/directives/address-display/address-display.html',
    };
});