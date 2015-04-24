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

    $scope.images = function(){
        ProductPhoto.getPhotoUrl().then(function(photo){
            $scope.photo = photo;
        });
    };
    $scope.images();

    $scope.description = function(){
       ProductInfo.getProductInfo().then(function(info){
        $scope.info = info;
       });
    };

});

app.factory('ProductPhoto', function($http){
    return{
        getPhotoUrl: function(){
            return $http.get('/api/product'+ $stateParams.product).then(function(response){
                return response.data;
            });
        }
    };
});

app.factory('ProductInfo', function($http){
     return{
            getProductInfo: function(){
                return $http.get('/api/product').then(function(response){
                    return response.data;
                });
            }
        };
});

