'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema.Types;

var lineItemSchema = new mongoose.Schema({
    quantity: {required: true, type: Number},
    product: {type: Schema.ObjectId, ref: 'Product', required: true},
    originalPrice: Number,
    promos: {type: Schema.ObjectId, ref: "Promo"},
    price: {required: true, type: Number}
});


mongoose.model('LineItem', lineItemSchema);