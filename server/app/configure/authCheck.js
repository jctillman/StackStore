module.exports = {
	isUser: function(req){
		return req.isAuthenticated();
	},
	isAdmin: function(req){
		return req.isAuthenticated() && req.user.admin;
	}
}