app.config(function ($stateProvider) {
    $stateProvider.state('admin.adminOrder.edit', {
        url: '/edit',
        controller: 'AdminOrderEditController',
        templateUrl: 'js/admin/adminOrder/orderEdit/orderEdit.html'
    });
});

app.controller('AdminOrderEditController', function($scope){

});
