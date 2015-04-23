'use strict';
app.directive('navbar', function ($rootScope, AuthService, AUTH_EVENTS, $state) {

    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'js/common/directives/navbar/navbar.html',
        link: function (scope) {

            scope.items = [
                { label: 'Home', state: 'home' },
                { label: 'Profile', state: 'user', auth: true },
                { label: 'Admin Only', state: 'admin', admin:true }
            ];

            scope.user = null;

            scope.AuthCheck = function(item){
                if(item.admin && scope.isAdmin()){
                    return true;
                }
                else if (item.auth && scope.isLoggedIn() && !item.admin){
                    return true;
                }
                else if(!item.auth && !item.admin){
                    return true;
                }
                else return false;
            };

            scope.isLoggedIn = function () {
                return AuthService.isAuthenticated();
            };

            scope.isAdmin = function(){
                return AuthService.isSuperUser();
            };

            scope.logout = function () {
                AuthService.logout().then(function () {
                   $state.go('home');
                });
            };

            var setUser = function () {
                AuthService.getLoggedInUser().then(function (user) {
                    scope.user = user;
                });
            };

            var removeUser = function () {
                scope.user = null;
            };

            setUser();

            $rootScope.$on(AUTH_EVENTS.loginSuccess, setUser);
            $rootScope.$on(AUTH_EVENTS.logoutSuccess, removeUser);
            $rootScope.$on(AUTH_EVENTS.sessionTimeout, removeUser);

        }

    };

});