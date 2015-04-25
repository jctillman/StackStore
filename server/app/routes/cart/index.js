var router = require('express').Router();
var qs =  require('qs');
var mongoose = require('mongoose');
var Auth = require('../../configure/authCheck');


require('../../../../server/db/models/product');
require('../../../../server/db/models/user');
require('../../../../server/db/models/order');
require('../../../../server/db/models/line-item');

var Product = mongoose.model('Product');
var User = mongoose.model('User');
var Order = mongoose.model('Order');
var LineItem = mongoose.model('LineItem');

// d) Checkout stuff.
// 1. Adding an item to one's cart, whether one is logged in or not.--DONE
// 2. Viewing stuff in one's cart.--DONE
// 3. Adding an address (to one's cart / order, and /or to one's user account).--DONE
// 4. Adding a payment method (to one's cart / order, etc).--undone
// 5. Confirming all of the above, and paying for all of the above.--undone


router.post('/addproduct/:id', function(req, res, next){

	var productId = req.params.id;

	var productAdd = function(productId, cartId){
		Product.ProductToOrder(productId, cartId, function(err, data){
				console.log((data===1) ? 200 : 500);
				res.sendStatus((data===1) ? 200 : 500);
			});
	};

	//If there is any user currently attached
	if(!!req.user){
		console.log("There is a user attached.");

		//If they have a cart, add the product to the cart.
		if(req.user.hasCart()){
			console.log("The user has a cart");
			productAdd(productId, req.user.cart);
		}
		else{
			console.log("The user lacks a cart");

			//If the session  has a cart, add the cart to the user, and add the product.
			if(req.session.cart){
				console.log("But the session has a cart");
				//Add the cart to to the user
				User.update(
					{_id: req.user.id},
					{cart: req.session.cart},
					function(err, data){
						//Add the product.
						productAdd(productId, req.session.cart);
					});

			}else{
				//If the session doesn't have a cart, make a new cart, add it to the session, 
				//add it to the user, and add the product to it.
				console.log("And the session lacks a cart");
				//So make a cart.
				Order.create({}, function(err, data){
					if(err){next(err);}
					//Add it to the session and
					console.log(data);
					req.session.cart = data._id;
					//Add it to the user
					User.update(
						{_id: req.user.id},
						{cart: data._id},
						function(err, affected){
							productAdd(productId, req.session.cart);
						}
						);
				});
			}
		}

	//If there is no user currently attached.
	}else{
		console.log("There is no user they are currently");
		//If we don't have an order attached to the session already, create that order and add the product.
		if(!(req.session.cart)){
			console.log("Have no cart");
			Order.create({}, function(err, data){
				console.log("Order created.");
				req.session.cart = data.id;
				productAdd(productId, data.id);
			});

		//If we do have an order attached to the session already, add the product to the session.
		}else{
			console.log("Have order attached");
			productAdd(productId, req.session.cart);
		}
	}
});



router.get('/cartcount', function(req, res, next){
	console.log("Hit cart count.");
	var cartId = req.session.cart || req.user.cart;
	console.log(cartId);
	if(cartId){
		Order.findOne({_id: cartId}).exec().then(function(data){
			console.log(data);
			res.send({items: data.lineItems.length});
		}, function(fail){
			console.log("!");
			res.send({items: 0});
		});
	}else{
		res.send(0);
	}
});


router.get('/lineItems', function(req, res, next){
	console.log("Getting line items.");
	var cartId = req.session.cart || req.user.cart;
	if(cartId){
		Order.findOne({_id: cartId}).deepPopulate('lineItems.product')
			.exec()
			.then(function(data){
				res.json({items: (data)});
			}, function(fail){
				res.json({items: []});
			});
	}else{
		res.send([]);
	}
});


router.put('/lineItem/:id/', function(req, res, next){
	console.log("Modifying line item.");
	var lineItemId = req.params.id;
	var lineItemNumber = req.body.number;
	var cartId = req.session.cart || req.user.cart;
	if(cartId){
		if(lineItemNumber === 0){
			console.log("Trying to del.");
			Order.update(
				{_id: cartId},
				{$pullAll : { lineItems : [lineItemId]}},
				function(err, data){
					if(err){next(err);}
					res.send(201);
				}
			);

		}else{
			console.log("Trying to mod.");
			LineItem.update(
				{_id: lineItemId},
				{quantity: lineItemNumber},
				function(err, data){
					if(err){next(err);}
					res.send(201);
				}
			);
		}
	}else{
		res.send(0);
	}
});

router.get('/currentstatus', function(req, res, next){
	if (req.session.cart){
		console.log(req.session.user);
		var userId = (req.session && req.user) ? req.user.id : null;
		res.send({cart: req.session.cart, user: userId});
	}else{
		res.send(500)
	}
});

//Update existing order
router.put('/', function(req, res, next){
	Order.findByIdAndUpdate(req.session.cart, req.body, function(err, foundOrder){
		if(err) return next(err);
		res.json(foundOrder);
	});
});

router.get('/', function(req, res, next){
	Order.findById(req.session.cart, function(err, foundOrder){
		if(err) return next(err);
		res.json(foundOrder);
	});
});



module.exports = router;


