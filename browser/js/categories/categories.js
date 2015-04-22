app.config(function ($stateProvider) {

    // Register our *about* state.
    $stateProvider.state('categoriesHome', {
        url: '/categoriesHome',
        controller: 'CategoriesController',
        templateUrl: 'js/categories/categories.html'
    })
});

app.controller('CategoriesController', function ($scope) {

    // Images of beautiful Fullstack people.
    $scope.images = [
     //images of products??
    ];

});