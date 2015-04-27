app.config(function ($stateProvider) {

    // Register our *about* state.
    $stateProvider.state('list.productDetail.addReview', {
        url: '/review/:product',
        controller: 'ProductReview',
        templateUrl: 'js/list/products/review.html'
    });

});

app.controller('ProductReview', function ($scope, ReviewFactory, $http, $stateParams, Session, $state, ProductInfo) {
    $scope.product = ProductInfo.product

     $scope.rating;
     $scope.content;


     $scope.submitReview = function(product){
        var review = {
            user: Session.user._id,
            product: product._id,
            stars: $scope.rating,
            content: $scope.content
        }
            ReviewFactory.createReview(review).then(function(data){
                $state.go('list');
            })
        
        };
     

    });


app.factory('ReviewFactory', function($http, $stateParams){
    return{
        addReview: function(){
            return $http.put('/api/product/search/', + {title: $stateParams.product}).then(function(response){
                return response.data;
            });
        },
        createReview: function(newReview){
            return $http.post('/api/review/newReview', newReview).then(function(response){
                return response.data;
            });
        }
    };
});