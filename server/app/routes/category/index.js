var router = require('express').Router();
var mongoose = require('mongoose');
var Auth = require('../../configure/authCheck');

require('../../../../server/db/models/product');
require('../../../../server/db/models/category');

var Product = mongoose.model('Product');
var Category = mongoose.model('Category');


router.get('/', function(req, res, next){
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

router.get('/:categoryId', function(req, res, next){
	Category.findOne({_id: req.params.categoryId}, function(err, category){
		if(err) return next(err);
		res.json(category);
	});
});


router.use(function(req, res, next){
	if(Auth.isAdmin(req)) next();
	else res.status(401);
});


//Update existing category
router.put('/:categoryId', function(req, res, next){
	Category.findByIdAndUpdate(req.params.categoryId, req.body, function(err, foundCategory){
		if(err) return next(err);
		res.json(foundCategory);
	});
});

//Delete a category
router.delete('/:categoryId', function(req, res, next){
	Category.findByIdAndRemove(req.params.categoryId, function(err, deletedCategory){
		if(err) return next(err);
		res.json(deletedCategory);
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



module.exports = router;