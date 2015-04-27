app.config(function ($stateProvider) {

    // Register our *about* state.
    $stateProvider.state('list.productDetail.addReview', {
        url: '/review/:product',
        controller: 'ProductReview',
        templateUrl: 'js/list/products/review.html'
    });

});

app.controller('ProductReview', function ($scope, ReviewFactory, $http, $stateParams, Session) {

     $scope.productReview = function(){
        ReviewFactory.addReview().then(function(data){
            $scope.product = data;
            $scope.review = data.review;
        });
     }

     $scope.productReview();

     $scope.rating;
     $scope.content;


     $scope.submitReview = function(product){
        var review = {
            user: Session.user._id,
            product: $scope.product._id,
            stars: $scope.rating,
            content: $scope.content
        }
            ReviewFactory.createReview(review).then(function(data){
                return(data);
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