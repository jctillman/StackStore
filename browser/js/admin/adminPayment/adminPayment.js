app.config(function ($stateProvider) {

    // Register our *about* state.
    $stateProvider.state('admin.adminPayment', {
        url: '/adminPayment',
        controller: 'AdminPaymentController',
        templateUrl: 'js/admin/adminPayment/adminPayment.html'
    });
});

app.controller('AdminPaymentController', function ($scope) {

    // ADD

});