var router = require('express').Router();
var qs =  require('qs');
var mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate');
var Auth = require('../../configure/authCheck');


require('../../../../server/db/models/product');
require('../../../../server/db/models/user');
require('../../../../server/db/models/address');
require('../../../../server/db/models/category');
require('../../../../server/db/models/payment-method');
require('../../../../server/db/models/order');
require('../../../../server/db/models/review');
require('../../../../server/db/models/lineItem');

var Product = mongoose.model('Product');
var Category = mongoose.model('Category');
var User = mongoose.model('User');
var Address = mongoose.model('Address');
var Order = mongoose.model('Order');
var PaymentMethod = mongoose.model('PaymentMethod');
var Review = mongoose.model('Review');
var LineItem = mongoose.model('LineItem');



//Ensure authentication 

router.get('/*', function(req, res, next){
	if(Auth.isAdmin(req)) next();
	throw new Error('You must be an admin to access this!');
});

//Admin product routes
//(Consider using req.params here)


//Update existing product
router.put('/product/:productId', function(req, res, next){
	Product.findByIdAndUpdate(req.params.productId, req.body, function(err, foundProduct){	
		if(err) return next(err);
		res.json(foundProduct);
	});
});

//Delete a product
router.delete('/product/:productId', function(req, res, next){
	Product.findByIdAndRemove(req.params.productId, function(err, deletedProduct){
		if(err) return next(err);
		res.json(deletedProduct);
	});
});

//Create a new product
router.post('/product/newProduct', function(req, res, next){
	console.log(req.body);
	Product.create(req.body).then(function(product){
		res.json(product);
	}, function(err){
		return next(err);
	});
});


//Admin category routes

//Get category info
router.get('/category/:categoryId', function(req, res, next){
	Category.findOne({_id: req.params.categoryId}, function(err, category){
		if(err) return next(err);
		res.json(category);
	});
});

//Update existing category
router.put('/category/:categoryId', function(req, res, next){
	Category.findByIdAndUpdate(req.params.categoryId, req.body, function(err, foundCategory){
		if(err) return next(err);
		res.json(foundCategory);
	});
});

//Delete a category
router.delete('/category/:categoryId', function(req, res, next){
	Category.findByIdAndRemove(req.params.categoryId, function(err, deletedCategory){
		if(err) return next(err);
		res.json(deletedCategory);
	});
});

//Create a new category
router.post('/category/newCategory', function(req, res, next){
	Category.create(req.body).then(function(category){
		res.json(category);
	}, function(err){
		return next(err);
	});
});



//Admin order routes

//Get order info
router.get('/order/:orderId', function(req, res, next){
	var populateQuery = [
	{path: 'user'}, 
	{path: 'lineItems'}, 
	{path: 'paymentMethod'},
	{path: 'shippingAddress'}
	]

	Order.findOne({_id: req.params.orderId})
			 .populate(populateQuery)
			 .exec(function(err, order){
			 		if(err) return next(err);
			 		res.json(order);
			 });
});

//Update existing order
router.put('/order/:orderId', function(req, res, next){
	Order.findByIdAndUpdate(req.params.orderId, req.body, function(err, foundOrder){
		if(err) return next(err);
		res.json(foundOrder);
	});
});

//Delete a order
router.delete('/order/:orderId', function(req, res, next){
	Order.findByIdAndRemove(req.params.orderId, function(err, deletedOrder){
		if(err) return next(err);
		res.json(deletedOrder);
	});
});

//Create a new order
router.post('/order/newOrder', function(req, res, next){
	Order.create(req.body).then(function(order){
		res.json(order);
	}, function(err){
		return next(err);
	});
});

//Admin user routes

//Get user info
router.get('/user/:userId', function(req, res, next){
	var populateQuery = [
		{path: 'orders'},
		{path: 'addresses'},
		{path: 'reviews'},
		{path: 'paymentMethods'},
		{path: 'cart'}
	];

	User.findOne({_id: req.params.userId})
			.populate(populateQuery)
			.exec(function(err, user){
					if(err) return next(err);
					res.json(user);
			});
});

//Update existing user
router.put('/user/:userId', function(req, res, next){
	User.findByIdAndUpdate(req.params.userId, req.body, function(err, foundUser){
		if(err) return next(err);
		res.json(foundUser);
	});
});

//Delete a user
router.delete('/user/:userId', function(req, res, next){
	User.findByIdAndRemove(req.params.userId, function(err, deletedUser){
		if(err) return next(err);
		res.json(deletedUser);
	});
});

//Create a new product
router.post('/user/newUser', function(req, res, next){
	User.create(req.body).then(function(user){
		res.json(user);
	}, function(err){
		return next(err);
	});
});



module.exports = router;