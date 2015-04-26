'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema.Types;

var lineItemSchema = new mongoose.Schema({
    quantity: {default: 1, type: Number},
    product: {type: Schema.ObjectId, ref: 'Product', required: true},
    price: Number
});

module.exports = lineItemSchema;
mongoose.model('LineItem', lineItemSchema);