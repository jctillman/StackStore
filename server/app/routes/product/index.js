var router = require('express').Router();
var mongoose = require('mongoose');

require('../../../../server/db/models/product');

var Product = mongoose.model('Product');

router.get('/', function(req, res, next){
	//console.log(req);
	res.send("not implemented yet");
});

router.post('/', function(req, res, next){
	res.send("not implemented yet");
});

router.put('/', function(req, res, next){
	res.send("not implemented yet");
});

router.delete('/', function(req, res, next){
 	res.send("not implemented yet");
});

module.exports = router;