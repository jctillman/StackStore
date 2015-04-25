'use strict';
app.factory('CartManager', function ($http, $q) { 
    return {

    	currentStatus: {},
    	currentUser: {},
    	currentCart: {},

    	modUser: function(){

    	},

    	setCart: function(set){
    		return $http.put('/api/cart', set)
    	},

    	setUser: function(set){
    		return this
    			.getStatus()
    			.then(function(currentStatus){
					return $http.put('/api/user/'+currentStatus.user, set);
				})
    	},

    	getCart: function(){
    		var self = this;
    		if(true){//Object.keys(self.currentCart).length == 0){
	    		return this
	    			.getStatus()
	    			.then(function(suc){
	    				console.log("Suc", suc);
	    				if(suc.cart){
	    					return $http.get('/api/cart');
	    				}
	    			})
	    			.then(function(cart){
	    				self.currentCart = cart.data;
	    				return cart.data;
	    			});
	    		}else{
		    		var dfr = $q.defer();
	    			dfr.resolve(self.currentCart);
	    			return dfr.promise;
	    		}
    	},

    	getUser: function(){
    		var self = this;
    		if(true){//if(Object.keys(self.currentUser).length == 0){
	    		return this
	    			.getStatus()
	    			.then(function(suc){
	    				console.log("Suc", suc);
	    				if(suc.user){
	    					return $http.get('/api/user/'+suc.user)

	    				}
	    			})
	    			.then(function(user){
	    				self.currentUser = user.data;
	    				return user.data;
	    			});
	    		}else{
		    		var dfr = $q.defer();
	    			dfr.resolve(self.currentUser);
	    			return dfr.promise;
	    		}
    	},

    	getStatus: function(){
    		var self = this;
    		//if(Object.keys(self.currentStatus).length == 0){
    			return $http
    				.get('/api/cart/currentstatus')
    				.then(function(data){
    					console.log(data);
    					self.currentStatus = data.data;
    					return self.currentStatus;
    				});
    		//}
    	} 
    };

});