app.config(function ($stateProvider) {

    $stateProvider
        .state('user', {
            url: '/:username',
            templateUrl: 'js/user/user.html',
            controller: 'UserCtrl',
            data: {
                authenticate: true
            }
        });

});

app.controller('UserCtrl', function($scope, $stateParams, UserFactory){

    $scope.userInfo = function(){
        UserFactory.getUserInfo().then(function(data){
            $scope.user = data;
            console.log($scope.user);
        });
    };

    $scope.userInfo();

    console.log('SCOPE USER ', $scope.user);

    $scope.showOrders = false;

    $scope.seeOrderHistory = function(){
        $scope.showOrders = true;
    };

    $scope.backToProfile = function(){
        $scope.showOrders = false;
    };

});

app.factory('UserFactory', function($http, $stateParams){
    return{
        getUserInfo: function(){
            return $http.get('/api/user/search/'+ $stateParams.username).then(function(response){
                return response.data;
            });
        }
    };

});