app.config(function ($stateProvider) {

    // Register our *about* state.
    $stateProvider.state('list.productDetail', {
        url: '/:product',
        controller: 'ProductDetail',
        templateUrl: 'js/list/products/products.html'
    });

});

<<<<<<< HEAD
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
=======
app.controller('ProductDetail', function ($scope, getProduct, $http, $stateParams) {
     
     $scope.productFind = function(){
        getProduct.getProductDetail().then(function(data){
            $scope.product = data;
        });
     }

    $scope.productFind();

});


app.factory('getProduct', function($http, $stateParams){
    return{
        getProductInfo: function(){
                return $http.get('/api/product/'+ $stateParams.product).then(function(response){
                    return response.data;
                });
            },
        getProductDetail: function(){
            console.log("Hey");
            console.log('/api/product/search/'+ $stateParams.product);
            return $http.put('/api/product/search/', {title: $stateParams.product}).then(function(response){
                console.log("ASDASD");
                return response.data;
            }).then(null, function(){
                console.log("I am erroring'");
            });
        },
        
    }
});
>>>>>>> 53ad9ddcf3e4ef92618b0472b60a62812e2c422e
