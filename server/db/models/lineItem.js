var mongoose = require('mongoose');
var Schema = mongoose.Schema.Types;

var lineItemSchema = new mongoose.Schema({
    quantity: Number,
    product: {type: Schema.ObjectId, ref: 'Product'},
    price: Number
});


mongoose.model('LineItem', lineItemSchema);