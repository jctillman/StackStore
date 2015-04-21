'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema.Types;

function validator (v) {return (v.length > 2 && v.length < 10);}


var promoSchema = new mongoose.Schema({
	code: {required: true, type: String, validate: [validator, 'Incorrect Length']},
	amountType: { required: true, type: String, enum: ["Percentage", "Absolute"] },
	amount: { required: true, type: Number},
	categories: [{type: Schema.ObjectId, ref: 'Category'}],
	description: String
});

promoSchema.pre('save', function (next) {

	if (this.amountType === "Percentage"){
		if (this.amount > 100 || this.amount < 0){ next(new Error("Invalid amount for percentage type.")); }
	}else if (this.amountType === "Absolute"){
		if (this.amount < 0) { next(new Error("Invalid amount for absolute type.")); }
	}

	if (!this.categories || this.categories.length === 0){
		next(new Error("Must apply to at least one category"));
	}

	next();

});


mongoose.model('Promo', promoSchema);