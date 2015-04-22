app.config(function ($stateProvider, USER_ROLES) {

    // Register our *about* state.
    $stateProvider.state('admin.adminProfile', {
        url: '/adminProfile',
        controller: 'AdminProfileController',
        templateUrl: 'js/admin/adminProfile/adminProfile.html'
    });
});

app.controller('AdminProfileController', function ($scope) {

    // ADD

});