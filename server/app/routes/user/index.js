var router = require('express').Router();
var mongoose = require('mongoose');
var auth = require('../../configure/authCheck');

require('../../../../server/db/models/product');
require('../../../../server/db/models/category');
require('../../../../server/db/models/address');



var User = mongoose.model('User');
var Address = mongoose.model('Address');
var Category = mongoose.model('Category');

router.use(function(req, res, next){
	if(auth.isUser(req)){
		next();
	}else{
		next(new Error("No user found."));
	};
})


router.get('/:userId', function(req, res, next){
	User
		.findById(req.params.userId)
		.populate("orders addresses cart reviews paymentMethods")
		.exec()
		.then(
				function(suc){
					res.send(suc);
				},
				function(fail){
					next(fail);
				}
			);
});

router.put('/:userId', function(req, res, next){
	User.update(
		{_id: req.params.userId},
		req.body,
		function(err, num){
			if(err){next(err);}
			if(num!==1){next(new Error());}
			if(num===1){res.send("Updated");}
		}
		);
});

router.post('/newUser', function(req, res, next){
	User.create(req.body).then(function(user){
		res.json(user);
	}, function(err){
		return next(err);
	});
});


router.post('/address', function(req, res, next){
	console.log("Pushing address that doesn't exist");
	var addressId = req.params.id;

	User.update(
		{_id: req.user.id},
		{$push : {addresses: addressId}},
		function(err, num){
			if(err){next(err);}
			if(num!==1){next(new Error());}
			if(num===1){res.send("Deleted");}
		}
		);
});

router.post('/address/:id', function(req, res, next){
	console.log("Pushing address that exists");
	var addressId = req.params.id;
	User.update(
		{_id: req.user.id},
		{$push : {addresses: addressId}},
		function(err, num){
			if(err){next(err);}
			if(num!==1){next(new Error());}
			if(num===1){res.send("Deleted");}
		}
		);
});

router.delete('/address/:id', function(req, res, next){
	console.log("Deleting address");
	var addressId = req.params.id;
	User.update(
		{_id: req.user.id},
		{$pull : {addresses: [addressId]}},
		function(err, num){
			if(err){next(err);}
			if(num!==1){next(new Error());}
			if(num===1){res.send("Deleted");}
		}
		);
});


router.use(function(req, res, next){
	if(auth.isAdmin(req)) next();
	else res.status(401);
});


router.get('/', function(req, res, next){
	User.find({}, function(err, users){
		if(err) return next(err);
		res.json(users);
	});
});


//Delete a user
router.delete('/:userId', function(req, res, next){
	User.findByIdAndRemove(req.params.userId, function(err, deletedUser){
		if(err) return next(err);
		res.json(deletedUser);
	});
});




module.exports = router;