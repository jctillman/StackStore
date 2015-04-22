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

var Product = mongoose.model('Product');
var Category = mongoose.model('Category');
var User = mongoose.model('User');
var Address = mongoose.model('Address');
var Order = mongoose.model('Order');
var PaymentMethod = mongoose.model('PaymentMethod');
var Review = mongoose.model('Review');

//Not completed:
// 2. CRUD for promos

// Completed
// 1. Creating product, reading product, updating existing product, deleting current product.
// 3. CRUD for categories.
// 4. CRUD for orders, so admins can modify orders at will
// 5. CRUD for users, so admins can elevate other admins

//In progress

// 6. I'm probably missing something here.  All of the above will need to be able to retrieve qua list, and maybe qua individual as well.


//Ensure authentication -- revise this?

var ensureAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).end();
    }
};



//Admin product routes
//(Consider using req.params here)

//Get product info
router.get('/:productId', function(req, res, next){
	Product.find({_id: req.params.id}, function(err, product){
		if(err) return next(err);
		res.json(product);
	});
});

//Update existing product
router.put('/:productId', function(req, res, next){
	Product.findByIdAndUpdate(req.params.id, req.body, function(err, foundProduct){
		if(err) return next(err);
		res.json(foundProduct);
	});
});

//Delete a product
router.delete('/:productId', function(req, res, next){
	Product.findByIdAndRemove(req.params.id, function(err, deletedProduct){
		if(err) return next(err);
		res.status(200);
	});
});

//Create a new product
router.post('/newProduct', function(req, res, next){
	Product.create(req.body).then(function(product){
		res.json(product);
	}, function(err){
		return next(err);
	});
});


//Admin category routes

//Get category info
router.get('/:categoryId', function(req, res, next){
	Category.find({_id: req.params.id}, function(err, category){
		if(err) return next(err);
		res.json(category);
	});
});

//Update existing category
router.put('/:categoryId', function(req, res, next){
	Category.findByIdAndUpdate(req.params.id, req.body, function(err, foundCategory){
		if(err) return next(err);
		res.json(foundCategory);
	});
});

//Delete a category
router.delete('/:categoryId', function(req, res, next){
	Category.findByIdAndRemove(req.params.id, function(err, deletedCategory){
		if(err) return next(err);
		res.status(200);
	});
});

//Create a new category
router.post('/newCategory', function(req, res, next){
	Category.create(req.body).then(function(category){
		res.json(category);
	}, function(err){
		return next(err);
	});
});



//Admin order routes

//Get order info
router.get('/:orderId', function(req, res, next){
	Order.find({_id: req.params.id}, function(err, order){
		if(err) return next(err);
		res.json(order);
	});
});

//Update existing order
router.put('/:orderId', function(req, res, next){
	Order.findByIdAndUpdate(req.params.id, req.body, function(err, foundOrder){
		if(err) return next(err);
		res.json(foundOrder);
	});
});

//Delete a order
router.delete('/:orderId', function(req, res, next){
	Order.findByIdAndRemove(req.params.id, function(err, deletedOrder){
		if(err) return next(err);
		res.status(200);
	});
});

//Create a new order
router.post('/newOrder', function(req, res, next){
	Order.create(req.body).then(function(order){
		res.json(order);
	}, function(err){
		return next(err);
	});
});

//Admin user routes

//Get user info
router.get('/:userId', function(req, res, next){
	User.find({_id: req.params.id}, function(err, user){
		if(err) return next(err);
		res.json(user);
	});
});

//Update existing user
router.put('/:userId', function(req, res, next){
	User.findByIdAndUpdate(req.params.id, req.body, function(err, foundUser){
		if(err) return next(err);
		res.json(foundUser);
	});
});

//Delete a user
router.delete('/:userId', function(req, res, next){
	User.findByIdAndRemove(req.params.id, function(err, deletedUser){
		if(err) return next(err);
		res.status(200);
	});
});

//Create a new product
router.post('/newUser', function(req, res, next){
	User.create(req.body).then(function(user){
		res.json(user);
	}, function(err){
		return next(err);
	});
});



module.exports = router;