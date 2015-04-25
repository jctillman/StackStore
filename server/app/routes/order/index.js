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


router.use(function(req, res, next){
	if(Auth.isAdmin(req)) next();
	else res.status(401);
});


//Get all orders
router.get('/', function(req, res, next){
	Order.find({}, function(err, orders){
		if(err) return next(err);
		res.json(orders);
	});
});




//Get order info
router.get('/:orderId', function(req, res, next){
	var populateQuery = [
	{path: 'user'}, 
	{path: 'lineItems'}, 
	{path: 'shippingAddress'}
	];

	Order.findOne({_id: req.params.orderId})
			 .populate(populateQuery)
			 .exec(function(err, order){
			 		if(err) return next(err);
			 		res.json(order);
			 });
});


//Update existing order
router.put('/:orderId', function(req, res, next){
	Order.findByIdAndUpdate(req.params.orderId, req.body, function(err, foundOrder){
		if(err) return next(err);
		res.json(foundOrder);
	});
});

//Delete a order
router.delete('/:orderId', function(req, res, next){
	Order.findByIdAndRemove(req.params.orderId, function(err, deletedOrder){
		if(err) return next(err);
		res.json(deletedOrder);
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




module.exports = router;