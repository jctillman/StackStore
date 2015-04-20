'use strict';
var mongoose = require('mongoose');


var paymentMethodSchema = new mongoose.Schema({
	type: String
});

// generateSalt, encryptPassword and the pre 'save' and 'correctPassword' operations
// are all used for local authentication security.



mongoose.model('PaymentMethod', paymentMethodSchema);