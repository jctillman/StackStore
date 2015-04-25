'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema.Types;
var deepPop = require('mongoose-deep-populate');
var lineItemSchema = require('./line-item');

var orderSchema = new mongoose.Schema({
    user: {type: Schema.ObjectId, ref: 'User'},
    session: {type: String},
    lineItems: [lineItemSchema],
    paymentMethod: {
        type: String,
        stripeSingleToken: String,
        stripeCustomerToken: String,
        dateSaved: Date
    },
    //Can't embedd non-arrayed schemas.  This needs to match what is in 
    //address.js
    address: {
        line1: {type: String},
        line2: String,
        state: {type: String},
        city: {type: String},
        country: {type: String},
        zip: {type: String}
    },
    dateOrdered: {type: Date},
    dateShipped: {type: Date},
    dateClosed: {type: Date},
    status: {type: String, default: "cart", required: true, enum: ['complete', 'in progress', 'cancelled', 'cart']},
    finalCost: Number,
    promo: String
});
orderSchema.plugin(deepPop, {});

orderSchema.virtual('totalPrice').get(function(){

    var promoObj;

    var self = this;
    var lineItemProductIds = self.lineItems.map(function(n){return n.product;});

    return mongoose
        .model('Promo')
        .findOne({code: this.promo})
        .exec()
        .then(function(promo){
            console.log("promo object: ", promo);
            return {promo: promo};
        })
        .then(function(accum){
            return mongoose
                .model('Product')
                .find({_id : {$in : lineItemProductIds}})
                .exec()
                .then(function(products){
                    console.log("Products attached: ", products)
                    productsWithNumbers = products.map(function(n){n['quantity'] = self.lineItems.filter(function(li){return li.product == n._id;})[0].quantity});
                })
        });

    //Do we have a promo?  If so, what categories does it apply to?

    //Get prices for products

});






mongoose.model('Order', orderSchema);