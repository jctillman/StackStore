app.config(function ($stateProvider) {

    $stateProvider.state('cart', {
        url: '/cart',
        templateUrl: 'js/cart/cart.html',
        controller: 'CartController',
        resolve: {
            cartInfo: function (CartFactory) {
                return CartFactory.getCartItems();
            }
        }
    });

});

app.factory('CartFactory', function ($http) {

    return {
        getCartItems: function () {
            // return $http.get('/api/cart/items').then(function (response) {
            //     return response.data;
            // });
        }
    };

});

app.controller('CartController', function ($scope, cartInfo) {

    // $scope.sections = cartInfo.sections;
    // $scope.items = _.groupBy(cartInfo.items, 'section');

    // $scope.currentSection = { section: null };

    // $scope.colors = [
    //     'rgba(34, 107, 255, 0.10)',
    //     'rgba(238, 255, 68, 0.11)',
    //     'rgba(234, 51, 255, 0.11)',
    //     'rgba(255, 193, 73, 0.11)',
    //     'rgba(22, 255, 1, 0.11)'
    // ];

    // $scope.getItemsBySection = function (section, items) {
    //     return items.filter(function (item) {
    //         return item.section === section;
    //     });
    // };

});