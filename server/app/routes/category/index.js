var router = require('express').Router();
var mongoose = require('mongoose');
var connection = mongoose.createConnection();
var Auth = require('../../configure/authCheck');
var q = require('q');


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

router.put('/', function(req, res, next){
	var tasks = [];

	// Category.find({type: req.body.type})
	// .exec()
	// .then(function(foundCategories){
	// 	return foundCategories;
	// }).then(function(categories){
	// 	categories.forEach(function(category){
	// 		category.type = req.body.newType;
	// 		tasks.push(category.saveAsync());
	// 	});
	// 	return tasks;
	// }).then(function(tasks){
	// 	q.all(tasks).then(function(){
	// 		res.status(200);
	// 	}, function(error){
	// 		return next(error);
	// 	});
	// });


	Category.find({type: req.body.type}, function(err, foundCategories){
			foundCategories.forEach(function(category){
				category.type = req.body.newType;
				tasks.push(category.saveAsync());
			});

			q.all(tasks).then(function(){
				console.log('here with the status');
				res.send(200);
			}, function(err){
				return next(err);
			});

		});

	
	});


router.put('/:categoryId', function(req, res, next){
	Category.findByIdAndUpdate(req.params.categoryId, req.body, function(err, foundCategory){
		if(err) return next(err);
		res.json(foundCategory);
	});
});

//Delete a category
router.delete('/', function(req, res, next){
	Category.find(req.body).remove().exec(function(err){
		if(err) return next(err);
		res.json(200);
	});
});

//Delete data within a category
router.delete('/:categoryId', function(req, res, next){
	Category.findByIdAndRemove(req.params.categoryId, function(err, deletedCategory){
		console.log(deletedCategory)
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