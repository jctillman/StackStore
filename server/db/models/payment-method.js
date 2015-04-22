'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema.Types;

var paymentMethodSchema = new mongoose.Schema({
	type: String
});


mongoose.model('PaymentMethod', paymentMethodSchema);