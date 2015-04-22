app.config(function ($stateProvider) {

    // Register our *about* state.
    $stateProvider.state('cart.payment', {
        url: '/payment',
        controller: 'PaymentController',
        templateUrl: 'js/cart/payment/payment.html'
    })
});

app.controller('PaymentController', function ($scope) {

//TO ADD.   

});