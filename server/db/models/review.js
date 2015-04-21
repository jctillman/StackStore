'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema.Types;
var async = require('async');

require('../../../server/db/models/user');
require('../../../server/db/models/product');

var User = mongoose.model('User');
var Product = mongoose.model('Product');


var validationMethod = function(content){
    return ( (content.length > 5) && (content.length < 5000) ) ;
};

var reviewSchema = new mongoose.Schema({
    user: {type: Schema.ObjectId, ref: 'User', required: true},
    product: {type: Schema.ObjectId, ref: 'Product', required: true},
    stars: {type: Number, max: 5, min: 1, required: true},
    content: {type: String, required: true, validate: [validationMethod, 'Incorrect length']}
});


reviewSchema.pre('save', function (next) {

	var id = this.id;
	var productId = this.product;
	var userId = this.user;

	var tasks = [
		function(cb){
			Product.update(
				{_id: productId},
				{$push : { 'reviews': id }},
				function(err, data){
					cb(err, data);
				}
			);
		},
		function(cb){
			User.update(
				{_id: userId},
				{$push : { 'reviews': id }},
				function(err, data){
					cb(err, data);
			});
		}
	];

	async.parallel(tasks, function(err, results){
		if(err){
			next(err);
		}else{
			next();
		}
	});

});


mongoose.model('Review', reviewSchema);