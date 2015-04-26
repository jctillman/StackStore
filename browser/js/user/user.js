app.config(function ($stateProvider) {

    $stateProvider
        .state('user', {
            url: '/:username',
            templateUrl: 'js/user/user.html',
            controller: 'UserCtrl',
            // The following data.authenticate is read by an event listener
            // that controls access to this state. Refer to app.js.
            data: {
                authenticate: true
            }
        });

});

app.controller('UserCtrl', function($scope, Session, OrderInfo){

    $scope.order = OrderInfo.order;

    $scope.user = Session.user;

    $scope.showOrders = false;

    $scope.seeOrderHistory = function(){
        $scope.showOrders = true;
    }

    $scope.backToProfile = function(){
        $scope.showOrders = false;
    }

});