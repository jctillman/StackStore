'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema.Types;

var paymentMethodSchema = new mongoose.Schema({
	type: String,
	stripeToken: String,
	dateSaved: Date
});

module.exports = paymentMethodSchema;
