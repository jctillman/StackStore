var router = require('express').Router();
var mongoose = require('mongoose');
var Auth = require('../../configure/authCheck');

require('../../../../server/db/models/review');
require('../../../../server/db/models/product');
require('../../../../server/db/models/user');

var Review = mongoose.model('Review');
var Product = mongoose.model('Product');
var User = mongoose.model('User');



router.use('/:userId', function(req, res, next){
	if(auth.isAdmin(req) || (auth.isUser(req) && req.user.id == req.params.userId)){
		next();
	}else{
		next(new Error("No user found."));
	}
});

router.get('/', function(req, res, next){

	Review
		.find({})
		.populate('user product')
		.exec()
		.then(
			function(reviews){
				res.json(reviews);
				console.log(reviews);
			},
			function(err){
				next(err);
			}
		);
});


router.put('/search', function(req, res, next){
 	Product.find(req.body).populate().exec().then(function(stuff){
 		res.send(stuff[0]);
 	}).then(null, function(){
 		res.send(500);
 	});
});

router.get('/:reviewId', function(req, res, next){
	var populateQuery = [
		{path: 'user'},
		{path: 'product'}
	];

	Review.findOne({_id: req.params.reviewId})
	 .populate(populateQuery)
     .exec(function(err, review){
	 		if(err) return next(err);
	 		res.json(review);
	 });
});


// router.use(function(req, res, next){
// 	if(Auth.isAdmin(req)) next();
// 	else res.status(401);
// });


// //Update existing revuew
// router.put('/:reviewId', function(req, res, next){
// 	console.log(req.body);
// 	Product.findByIdAndUpdate(req.params.reviewId, req.body, function(err, foundReview){	
// 		if(err) return next(err);
// 		res.json(foundReview);
// 	});
// });

// //Delete a review
// router.delete('/:reviewId', function(req, res, next){
// 	Product.findByIdAndRemove(req.params.reviewId, function(err, deletedReview){
// 		if(err) return next(err);
// 		res.json(deletedReview);
// 	});
// });

//Create a new review
router.post('/newReview', function(req, res, next){
	
	Review.create(req.body).then(function(review){
		
		res.json(review);

	}, function(err){
		return next(err);
	});
});


module.exports = router;