app.config(function ($stateProvider) {

    // Register our *about* state.
    $stateProvider.state('cart.address', {
        url: '/address',
        controller: 'AddressController',
        templateUrl: 'js/cart/address/address.html'
    })
});

app.controller('AddressController', function ($scope) {



});