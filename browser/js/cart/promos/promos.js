app.config(function ($stateProvider) {

    // Register our *about* state.
    $stateProvider.state('cart.promos', {
        url: '/promos',
        controller: 'PromosController',
        templateUrl: 'js/cart/promos/promos.html'
    })
});

app.controller('PromosController', function ($scope) {



});