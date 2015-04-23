var router = require('express').Router();
var mongoose = require('mongoose');
var auth = require('../../configure/authCheck');

require('../../../../server/db/models/product');
require('../../../../server/db/models/category');
require('../../../../server/db/models/address');



var Product = mongoose.model('User');
var Product = mongoose.model('Address');
var Product = mongoose.model('Category');

router.use(function(req, res, next){
	if(auth.isUser(req)){
		next();
	}else{
		next(new Error("No user found."));
	};
})

router.get('/', function(req, res, next){
	User
		.findById(req.user.id)
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

router.post('/', function(req, res, next){
	User.update(
		{_id: req.user.id},
		req.body,
		function(err, num){
			if(err){next(err);}
			if(num!==1){next(new Error());}
			if(num===1){res.send("Updated");}
		}
		);
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




module.exports = router;