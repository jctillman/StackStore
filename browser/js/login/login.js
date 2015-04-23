app.config(function ($stateProvider) {

    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'js/login/login.html',
        controller: 'LoginCtrl'
    });

});

app.controller('LoginCtrl', function ($scope, AuthService, $state) {

    $scope.login = {};
    $scope.error = null;

    $scope.enterAccount = false;
    $scope.newUser = false;
    
    console.log($scope.enterAccount);

    $scope.loginBtn = function(){
        $scope.enterAccount = true;
        $scope.newUser = false;
    };

    $scope.signupBtn = function(){
        $scope.newUser = true;
        $scope.enterAccount = false;
    };

    $scope.sendLogin = function (loginInfo) {

        $scope.error = null;

        AuthService.login(loginInfo).then(function () {
            $state.go('home');
        }).catch(function () {
            $scope.error = 'Invalid login credentials.';
        });

    };



});