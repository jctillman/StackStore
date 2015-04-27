app.config(function ($stateProvider) {

    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'js/login/login.html',
        controller: 'LoginCtrl'
    });

});

app.controller('LoginCtrl', function ($scope, AuthService, $state, UserInfo) {
    

    $scope.login = {};
    $scope.signup = {
        name: {
            first: '',
            middle: '',
            last: '',
        },
        email: '',
        password: ''
    };

    $scope.error = null;

    $scope.enterAccount = false;
    $scope.newUser = false;

    $scope.loginBtn = function(){
        $scope.enterAccount = true;
        $scope.newUser = false;
    };

    $scope.signupBtn = function(){
        $scope.newUser = true;
        $scope.enterAccount = false;
    };

    $scope.googleSignIn = function(){
        AuthService.googleLogin().then(function(user){
            console.log(user);
        })
    }

    $scope.sendLogin = function (loginInfo) {

        $scope.error = null;

        AuthService.login(loginInfo).then(function () {
            $state.go('home');
        }).catch(function () {
            $scope.error = 'Invalid login credentials.';
        });

    };

    $scope.callbackURL = AuthService.googleCB;
    window.callbackURL = $scope.callbackURL;

    $scope.sendSignUp = function (signUpInfo) {
        UserInfo.createNewUser(signUpInfo).then(function(newUser){
            console.log(newUser);
            $state.go('home');
        });
    };



});

