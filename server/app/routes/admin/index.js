var router = require('express').Router();
var qs =  require('qs');
var mongoose = require('mongoose');

require('../../../../server/db/models/product');
require('../../../../server/db/models/user');
require('../../../../server/db/models/address');
require('../../../../server/db/models/category');
require('../../../../server/db/models/payment-method');
require('../../../../server/db/models/order');
require('../../../../server/db/models/review');
require('../../../../server/db/models/promo');

var Product = mongoose.model('Product');
var Category = mongoose.model('Category');
var User = mongoose.model('User');
var Address = mongoose.model('Address');
var Order = mongoose.model('Order');
var PaymentMethod = mongoose.model('PaymentMethod');
var Review = mongoose.model('Review');
var Promo = mongoose.model('Promo');

//Not completed:
// 2. CRUD for promos

// Completed
// 1. Creating product, reading product, updating existing product, deleting current product.
// 3. CRUD for categories.
// 4. CRUD for orders, so admins can modify orders at will
// 5. CRUD for users, so admins can elevate other admins

//In progress

// 7. pre-populating with the gets
// 8. move the get products out
// 9. add promo codes
// 10. add authentication


//Ensure authentication -- revise this?

// var ensureAuthenticated = function (req, res, next) {
//     if (req.isAuthenticated()) {
//         next();
//     } else {
//         res.status(401).end();
//     }
// };


//Admin product routes
//(Consider using req.params here)

//Get product info
//populate reviews and categories
//take this out of the admin route altogether
router.get('/product/:productId', function(req, res, next){
	Product.findOne({_id: req.params.productId}, function(err, product){
		if(err) return next(err);
		res.json(product);
	});
});

//Update existing product
//
router.put('/product/:productId', function(req, res, next){
	console.log("Body", req.body)
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
//what about categories?
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
	console.log('getting category');
	Category.findOne({_id: req.params.categoryId}, function(err, category){
		if(err) return next(err);
		res.json(category);
	});
});

//Update existing category
router.put('/category/:categoryId', function(req, res, next){
	console.log("iM HEREEEEEE");
	Category.findByIdAndUpdate(req.params.categoryId, req.body, function(err, foundCategory){
		console.log(foundCategory);
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

//Create a promo
router.post('/category/promo', function(req, res, next){
	Promo.create(req.body).then(function(promo){
		res.json(promo);
	}, function(err){
		if(err)return next(err);
	});
});

//Update a promo
router.put('/category/promo/:promoId', function(req, res, next){
	Promo.findByIdAndUpdate(req.params.promoId, req.body, function(err, foundPromo){
		if(err) return next(err);
		res.json(foundPromo);
	});
});

//Delete a promo
router.delete('/category/promo/:promoId', function(req, res, next){
	console.log('yo')
	Promo.findByIdAndRemove(req.params.promoId, function(err, deletedPromo){
		if(err) return next(err);
		res.json(deletedPromo);
	});
});

//Admin order routes

//Get order info
router.get('/order/:orderId', function(req, res, next){
	Order.findOne({_id: req.params.orderId}, function(err, order){
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
	User.findOne({_id: req.params.userId}, function(err, user){
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