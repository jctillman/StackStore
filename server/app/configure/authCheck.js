module.exports = {
	isUser: function(req){
		return req.user && req.isAuthenticated();
	},
	isAdmin: function(req){
		return req.user && req.isAuthenticated() && req.user.admin;
	}
}