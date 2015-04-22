app.config(function ($stateProvider) {

    // Register our *about* state.
    $stateProvider.state('categoriesHome.productDetail', {
        url: '/:productDetail',
        controller: 'ProductDetail',
        templateUrl: 'js/categories/products/products.html'
    });

});

app.controller('ProductDetail', function ($scope) {

    // Images of beautiful Fullstack people.
    $scope.images = [
     //images of products??
    ];

});