'use strict';
var mongoose = require('mongoose');


var paymentMethodSchema = new mongoose.Schema({
	type: String
});


mongoose.model('PaymentMethod', paymentMethodSchema);