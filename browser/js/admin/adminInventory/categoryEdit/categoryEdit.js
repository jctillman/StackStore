app.config(function ($stateProvider) {
    $stateProvider.state('admin.adminInventory.editCat', {
        url: '/:editCatState',
        controller: 'AdminCategoryEditController',
        templateUrl: 'js/admin/adminInventory/categoryEdit/categoryEdit.html'
    });
});


app.controller('AdminCategoryEditController', function($scope){

});

app.factory('Category')