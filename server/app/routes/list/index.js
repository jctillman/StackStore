var router = require('express').Router();
var mongoose = require('mongoose');

require('../../../../server/db/models/product');
require('../../../../server/db/models/category');

var Product = mongoose.model('Product');
var Category = mongoose.model('Category');

//API
//So, asking for api/lists/products simply returns the JSON
//for the product list (the whole thing) entirely unfiltered.
//
//Asking for api/lists/products?categories=objectid,objectid
//returns the product list with only the items belonging to the
//categories which were attached.
//
//TODO: Paging?
//TODO: Server-side ordering?

router.get('/products', function(req, res, next){

	var categories = req.query.categories;
	if (categories){
		var categoriesReady = categories
			.split(',')
			.map(function(id){
				return new mongoose.Types.ObjectId(id)
			});	
		var query = {categories: {$all: categoriesReady}}
	}else{
		var query = {}
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

router.get('/products/:productId', function(req, res, next){
	var populateQuery = [{path: 'categories'}, {path: 'reviews'}];
	Product.findOne({_id: req.params.productId})
				 .populate(populateQuery)
				 .exec(function(err, product){
				 		if(err) return next(err);
				 		res.json(product);
				 });
});


//Returns all the categories.
//Api: GET api/lists/categories
//There's pretty much going to be no reason to ask for anything but
//All of these, so that's just what I'm returning.
router.get('/categories', function(req, res, next){
	Category
		.find({})
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

module.exports = router;