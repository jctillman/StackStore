app.config(function ($stateProvider) {

    // Register our *about* state.
    $stateProvider.state('list.productDetail.addReview', {
        url: '/review/:product',
        controller: 'ProductReview',
        templateUrl: 'js/list/products/review.html'
    });

});

app.controller('ProductReview', function ($scope, ReviewFactory, $http, $stateParams) {

     $scope.productReview = function(){
        ReviewFactory.addReview().then(function(data){
            $scope.product = data;
        });
     }

     $scope.productReview();

    //  $scope.addReview = function(){
    //     ReviewFactory.addProductReview().then(function(data){
    //         $scope.review = data;
    //     });
    //  }

    // $scope.addReview();

});


app.factory('ReviewFactory', function($http, $stateParams){
    return{
        addReview: function(){
            return $http.put('/api/product/search/', + {title: $stateParams.product}).then(function(response){
                return response.data;
            });
        }
    }
});