'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema.Types;

var lineItemSchema = new mongoose.Schema({
    quantity: Number,
    product: {type: Schema.ObjectId, ref: 'Product'},
    price: Number
});

// generateSalt, encryptPassword and the pre 'save' and 'correctPassword' operations
// are all used for local authentication security.



mongoose.model('LineItem', lineItemSchema);