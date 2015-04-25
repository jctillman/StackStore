var router = require('express').Router();
var mongoose = require('mongoose');
var Auth = require('../../configure/authCheck');

require('../../../../server/db/models/product');

var Product = mongoose.model('Product');


router.get('/', function(req, res, next){

	var query;
	var categories = req.query.categories;
	if (categories){
		var categoriesReady = categories
			.split(',')
			.map(function(id){
				return new mongoose.Types.ObjectId(id);
			});	
		query = {categories: {$all: categoriesReady}};
	}else{
		query = {};
	}

	Product
		.find(query)
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
});


router.put('/search', function(req, res, next){
 	Product.find(req.body).populate('categories reviews').exec().then(function(stuff){
 		res.send(stuff[0]);
 	}).then(null, function(){
 		res.send(500);
 	});
});

router.get('/:productId', function(req, res, next){
	var populateQuery = [{path: 'categories'}, {path: 'reviews'}];
	Product.findOne({_id: req.params.productId})
				 .populate(populateQuery)
			     .exec(function(err, product){
				 		if(err) return next(err);
				 		res.json(product);
				 });
});




router.use(function(req, res, next){
	if(Auth.isAdmin(req)) next();
	else res.status(401);
});


//Update existing product
router.put('/:productId', function(req, res, next){
	console.log(req.body);
	Product.findByIdAndUpdate(req.params.productId, req.body, function(err, foundProduct){	
		if(err) return next(err);
		res.json(foundProduct);
	});
});

//Delete a product
router.delete('/:productId', function(req, res, next){
	Product.findByIdAndRemove(req.params.productId, function(err, deletedProduct){
		if(err) return next(err);
		res.json(deletedProduct);
	});
});

//Create a new product
router.post('/newProduct', function(req, res, next){
	console.log(req.body);
	Product.create(req.body).then(function(product){
		res.json(product);
	}, function(err){
		return next(err);
	});
});


module.exports = router;