'use strict';
app.directive('navbar', function ($rootScope, AuthService, AUTH_EVENTS, CartReload, $state) {

    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'js/common/directives/navbar/navbar.html',
        link: function (scope) {

            scope.cartCount = 0;

            scope.getNewItems = function(){
                CartReload.getCartItems().then(function(items){
                    scope.cartCount = items.items;
                });
            }

            $rootScope.$on('addedItem', scope.getNewItems);
            $rootScope.$emit('addedItem');

        

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

            scope.items = [
                { label: 'Products', state: 'list'},
                { label: 'Profile', state: 'user', param: 'username', auth: true },
                { label: 'Admin Only', state: 'admin', admin:true }
            ];

                 //({ username:{{item.param}} })
            scope.hasParam = function(item, user){
                var itemState = item.state;
                var itemParam = item.param;
                var itemParamName = user.email;
                var paramAddress = (itemParam + ":" + itemParamName);
                if(itemParam){
                    $state.go(itemState, {itemParam: itemParamName});
                    console.log(itemParam, itemParamName);
                }
                else{
                    $state.go(itemState);
                }
            }

        }

    };

});

app.factory('CartReload', function($http){

    return {

        getCartItems: function(){
            return $http.get('/api/cart/cartcount').then(function(response){
                return response.data;
            });
        }

    }

});