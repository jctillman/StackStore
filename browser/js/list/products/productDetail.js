app.config(function ($stateProvider) {

    // Register our *about* state.
    $stateProvider.state('list.productDetail', {
        url: '/:product',
        controller: 'ProductDetail',
        templateUrl: 'js/list/products/products.html'
    });

});

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