app.config(function ($stateProvider) {

    // Register our *about* state.
    $stateProvider.state('admin.adminOrder', {
        url: '/adminOrder',
        controller: 'AdminOrderController',
        templateUrl: 'js/admin/adminOrder/adminOrder.html'
    });
});

app.controller('AdminOrderController', function ($scope) {

    // ADD

});