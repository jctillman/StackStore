var router = require('express').Router();
var qs =  require('qs');
var mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate');
var Auth = require('../../configure/authCheck');


require('../../../../server/db/models/product');
require('../../../../server/db/models/user');
require('../../../../server/db/models/category');
require('../../../../server/db/models/order');
require('../../../../server/db/models/review');
require('../../../../server/db/models/promo');
require('../../../../server/db/models/line-item');


var Product = mongoose.model('Product');
var Category = mongoose.model('Category');
var User = mongoose.model('User');
var Order = mongoose.model('Order');
var Review = mongoose.model('Review');
var Promo = mongoose.model('Promo');


var LineItem = mongoose.model('LineItem');


//Ensure authentication 

router.use(function(req, res, next){
	console.log(Auth.isAdmin(req));
	if(Auth.isAdmin(req)) next();
	else res.status(401);
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
	console.log('yo');
	Promo.findByIdAndRemove(req.params.promoId, function(err, deletedPromo){
		if(err) return next(err);
		res.json(deletedPromo);
	});
});



module.exports = router;