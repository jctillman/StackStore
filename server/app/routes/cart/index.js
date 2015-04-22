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

router.post('/:productId')



router.get('/products', function(req, res, next){

	var categories = req.query.categories;

	//unfiltered
	if (!categories){	
		Product
			.find({})
			.populate('categories')
			.exec()
			.then(
			function(success){
				res.send(success);
			},
			function(fail){
				next(fail);
			}
		);
	}

	//filtered
	else{
		res.send(categories);
	}

});

router.get('categories', function(req, res, next){



});

module.exports = router;