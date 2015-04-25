app.config(function ($stateProvider) {

    // Register our *about* state.
    $stateProvider.state('list.productDetail', {
        url: '/:product',
        controller: 'ProductDetail',
        templateUrl: 'js/list/products/products.html'
    });

});

app.controller('ProductDetail', function ($scope, ProductPhoto, ProductInfo, $http, $stateParams) {

    $scope.product = $stateParams.product;
      

});

// app.factory('ProductPhoto', function($http){
//     return{
//         getPhotoUrl: function(){
//             return $http.get('/api/product'+ $stateParams.product).then(function(response){
//                 return response.data;
//             });
//         }
//     };
// });

app.factory('ProductInfo', function($http){
    return{
            getProductInfo: function(){
                return $http.get('/api/product/').then(function(response){
                    return response.data;
                });
            },

            product: {
                title: "",
                price: null,
                categories: [],
                photoUrls: [],
                splashPhoto: null,
                reviews: [],
                promo: ''
            },

            category: {
                type: '',
                data: '',
                order: null
            }
        };
});
