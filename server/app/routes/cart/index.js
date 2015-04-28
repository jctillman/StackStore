var router = require('express').Router();
var qs =  require('qs');
var Promise = require('bluebird')
var mongoose = Promise.promisifyAll(require('mongoose'));
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

router.use(function(req, res, next){
	console.log("Hit middleware")

	var sessionCart = req.session && req.session.cart;
	var userCart = req.user && req.user.cart;

	if(req.user){

		if (!sessionCart && !userCart){
			Order.create({}, function(err, data){
				console.log("Creating cart for user & session");
		  		req.session.cart = data._id;
		  		req.user.cart = data._id;
		  		next();
			});}
		if(!sessionCart && userCart){
			console.log("Setting user cart to session cart");
	  		req.session.cart = req.user.cart;
	  		next();
		}
		if(sessionCart && !userCart){
			console.log("Setting session cart to user cart");
	  		req.user.cart = req.session.cart;
	  		next();
		}
		if(sessionCart && userCart){
			if(req.user.cart !== req.session.cart){
				console.log("Checking to make sure user cart is same as session cart.");
				req.user.cart = req.session.cart;
				next();
			}
		}
	}else{
		if(!sessionCart){
			Order.create({}, function(err, data){
				console.log("Making a new cart and setting session cart to it.");
				req.session.cart = data._id;
				next();
			});
		}else{
			console.log("Already is a cart, is no user.  Carry on.");
			next();
		}
	}
});



router.get('/getFinalCost', function(req, res, next){
	console.log("At get final");
	Order
		.findById(req.session.cart)
		.populate('lineItems.product')
		.exec()
		.then(function(foundOrder){
			console.log("asdasdasdas")
			foundOrder.totalPrice().then(function(stuff){
				res.json(stuff);
			});
		})
		.then(null, function(){
			res.send(500);
		});
});


router.get('/purchase', function(req, res, next){
	console.log("At purchase.");
	Order
		.findById(req.session.cart)
		.exec()
	.then(function(foundOrder){
		console.log("Found order")
		console.log("this is the found order", foundOrder);
		console.log("cart id", req.session.cart);
			foundOrder.purchase(req.session.cart, function(err, data){
				if(err){
					console.log("Some error", err);
					res.send(500);
				}else{
					console.log("No error");
					if (req.user) { req.user.cart = null; }
					if (req.session) { req.session.cart = null; }
					res.send(data);
				}	
			});
	}).then(null, function(err){
		console.log("Failed to find order");
		console.log(err);
		res.send(500);
	});
});

router.post('/addproduct/:id', function(req, res, next){

	var productId = req.params.id;

	var ProductToOrder = function(productId, orderId, cb){
	    Order.findById(orderId)
	        .exec()
	        .then(function(order){
	            var index = order.lineItems.map(function(n){return n.product.toString();}).indexOf(productId);
	            console.log("Index" + index);
	            if (index === -1){
	                order.lineItems.push({product: productId, quantity: 1});
	            }else{
	                order.lineItems[index].quantity++;
	            }
	            order.save(cb);
	        })
	        .then(null, function(err){cb("Error", null)});
	}

	var productAdd = function(productId, cartId){
		ProductToOrder(productId, cartId, function(err, data){
				console.log((err) ? 500 : 200);
				res.sendStatus((err) ? 500 : 200);
			});
	};

	productAdd(productId, req.session.cart);
/*
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
				console.log(err);
				console.log("Order created.");
				req.session.cart = data.id;
				productAdd(productId, data.id);
			});

		//If we do have an order attached to the session already, add the product to the session.
		}else{
			console.log("Have order attached");
			productAdd(productId, req.session.cart);
		}
	}*/
});



router.get('/cartcount', function(req, res, next){
	/*console.log("Hit cart count.");
	if (!req.session.cart){
		console.log("In iff");
		Order.create({}, function(err, data){
			console.log(err);
			console.log("Order created.");
			req.session.cart = data.id;
			res.send({items: 0});
		});
		return;
	};*/
	var cartId = req.session.cart;
	Order.findById(cartId).exec().then(function(cart){
		console.log(cart.lineItems.length);
		res.send({items: cart.lineItems.length});
	}).then(null, function(err){
		console.log("500 in cartcount");
		console.log(err);
		res.send(500);
	});
});


router.get('/lineItems', function(req, res, next){
	console.log("Getting line items.");
	var cartId = req.session.cart || req.user.cart;
	if(cartId){
		Order.findOne({_id: cartId}).exec().then(function(order){
			res.send(order.lineItems);
		})
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
	//var find = req.body.find;
	//var replace = req.body.replace;
	console.log(req.body);
	Order.findByIdAndUpdate(req.session.cart, req.body, function(err, foundOrder){
		if(err) return next(err);
		res.json(foundOrder);
	});
});

router.get('/', function(req, res, next){
	Order
		.findById(req.session.cart)
		.populate('lineItems.product')
		.exec()
		.then(function(foundOrder){
			res.json(foundOrder);
		})
		.then(null, function(){

		});
});

module.exports = router;