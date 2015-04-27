app.config(function ($stateProvider) {

    // Register our *about* state.
    $stateProvider.state('list.productDetail', {
        url: '/:product',
        controller: 'ProductDetail',
        templateUrl: 'js/list/products/products.html'
    });

});

app.controller('ProductDetail', function ($scope, getProduct, $http, $stateParams, $state) {
     
     $scope.productFind = function(){
        getProduct.getProductDetail().then(function(data){
            $scope.product = data;
        });
     }

    $scope.productFind();

    $scope.goToAddReview = function(product){
            $state.go('list.productDetail.addReview');
        }

});


app.factory('getProduct', function($http, $stateParams){
    return{
        getProductInfo: function(){
                return $http.get('/api/product/'+ $stateParams.product).then(function(response){
                    return response.data;
                });
            },
        getProductDetail: function(){
            return $http.put('/api/product/search/', {title: $stateParams.product}).then(function(response){
                return response.data;
            }).then(null, function(){
            });
        }
        
    }
});