app.config(function ($stateProvider, USER_ROLES) {

    // Register our *about* state.
    $stateProvider.state('admin', {
        url: '/admin',
        controller: 'AdminController',
        templateUrl: 'js/admin/admin.html',
        data: {
            authenticate: true,
            authorizedRoles: [USER_ROLES.admin]
        }
    });
});

app.controller('AdminController', function ($scope) {

});