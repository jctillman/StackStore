'use strict';
app.directive('addressDisplay', function ($rootScope, $http) {

    return {
        restrict: 'E',
        scope: {address: '=', myclick: '='},
        templateUrl: 'js/common/directives/address-display/address-display.html',
    	link: function(s, e, a){
    		var self = s;
    		s.clicked = function(){
    			self.myclick(self.address);
    		}
    	}
    };
});