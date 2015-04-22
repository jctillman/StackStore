var router = require('express').Router();
var qs =  require('qs');
var mongoose = require('mongoose');

require('../../../../server/db/models/product');
require('../../../../server/db/models/category');

var Product = mongoose.model('Product');
var Category = mongoose.model('Category');


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