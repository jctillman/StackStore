app.config(function ($stateProvider) {

    // Register our *about* state.
    $stateProvider.state('cart.confirmation', {
        url: '/confirmation',
        controller: 'ConfirmationController',
        templateUrl: 'js/cart/confirmation/confirmation.html'
    })
});

app.controller('ConfirmationController', function ($scope) {



});