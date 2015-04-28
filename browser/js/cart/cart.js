app.config(function ($stateProvider) {
    $stateProvider.state('cart', {
        url: '/cart',
        templateUrl: 'js/cart/cart.html',
        controller: 'CartController'
    });
});



app.factory('CartFactory', function ($http) {

    var states = ['editing','address','payment','promos','confirmation']
    var stateSpot = 0;
    var changes = [];

    return {

        onChange: function(func){
            changes.push(func);
        },

        change: function(){
            changes.forEach(function(func){ func(this.states[this.stateSpot]) });
        },

        advance: function(){
            stateSpot++;
            this.change();
        }

    };

});



app.controller('CartController', function ($scope, CartFactory) {

    $scope.checkoutStage = 'editing'

    CartFactory.onChange(function(state){
        $scope.checkoutStage = state;
        //$scope.$digest();
    });

});