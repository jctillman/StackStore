'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema.Types;
var deepPop = require('mongoose-deep-populate');
var lineItemSchema = require('./line-item');

require('./promo');
var Promo = mongoose.model('Promo');



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




orderSchema.methods.totalPrice = function(){

    var promoObj;

    var self = this;
    var pr = this.promo;
    //console.log("promo code in order", pr);
    var lineItemProductIds = self.lineItems.map(function(n){return n.product;});
    console.log("LIPI", lineItemProductIds);

    return Promo
        .find()
        .exec()
        .then(function(promoFound){
            console.log("promo object found with that code: ", promoFound);
            return {promo: promoFound};
        })
        .then(function(accum){
            return accum;
        }).then(function(accum){
            console.log("NNNNN", accum);

            return  mongoose.model('Product')
                .find()
                .exec()
                .then(function(p){
                    console.log("Products attached: ", p)
                    var attached = p.map(function(n){
                        n['quantity'] = 3;
                        return n;
                    });
                    console.log("Attached", attached);
                    return {attached: attached, promo: accum.promo}
                });
        }).then(function(productWithNumbers){ß
            console.log("XXXXX", productWithNumbers);
            return productWithNumbers;
        });

    //Do we have a promo?  If so, what categories does it apply to?

    //Get prices for products

};






mongoose.model('Order', orderSchema);