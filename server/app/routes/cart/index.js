var router = require('express').Router();
var qs =  require('qs');
var mongoose = require('mongoose');

require('../../../../server/db/models/product');
require('../../../../server/db/models/user');
require('../../../../server/db/models/address');
require('../../../../server/db/models/payment-method');

var Product = mongoose.model('Product');
var User = mongoose.model('User');
var Address = mongoose.model('Address');
var PaymentMethod = mongoose.model('PaymentMethod');


// d) Checkout stuff.
// 1. Adding an item to one's cart, whether one is logged in or not.
// 2. Viewing stuff in one's cart.
// 3. Adding an address (to one's cart / order, and /or to one's user account).
// 4. Adding a payment method (to one's cart / order, etc).
// 5. Confirming all of the above, and paying for all of the above.


//Sets req.product

router.post('/newItem', function(req, res, next){
	if(req.user){
		User.find({_id: req.user.id})
	}
})

// router.params('user', function(req, res, next, id){
// 	User.find(id, function(err, user){
// 		if(err) return next(err);
// 		else if(user) {
// 			req.user = user;
// 			next();
// 		}
// 		else if(!user){
// 			req.user = guest;
// 		}
		
// 		next();
// 	});
// });

// router.params('product', function(req, res, next, id){
// 	Product.find(id, function(err, product){
// 		if(err) return next(err);
// 		req.product = product;
// 		next();
// 	});
// });

//Adds items to a user's cart
router.post('/:user/:productId', function(req, res, next){
	
});




module.exports = router;