'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema.Types;
var deepPop = require('mongoose-deep-populate');

var orderSchema = new mongoose.Schema({
    user: {type: Schema.ObjectId, ref: 'User'},
    session: {type: String},
    lineItems: [{type: Schema.ObjectId, ref: 'LineItem'}],
    paymentMethod: {
        type: String,
        stripeToken: String,
        dateSaved: Date
    },
    //Can't embedd non-arrayed schemas.  This needs to match what is in 
    //address.js
    address: {
        line1: {type: String, required: true},
        line2: String,
        state: {type: String},
        city: {type: String, required: true},
        country: {type: String, required: true},
        zip: {type: String, required: true}
    },
    dateOrdered: {type: Date},
    dateShipped: {type: Date},
    dateClosed: {type: Date},
    status: {type: String, default: "cart", required: true, enum: ['complete', 'in progress', 'cancelled', 'cart']},
    promo: {type: Schema.ObjectId, ref: 'Promo'}
});
orderSchema.plugin(deepPop, {});



mongoose.model('Order', orderSchema);