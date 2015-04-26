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
    //

    return Promo
        .find()
        .exec()
        .then(function(promoFound){
            console.log("promo object found with that code: ", promoFound);
            return {promo: promoFound};
        })
        .then(function(accum){
            return accum;
        }).then(function(asd){
            console.log("NNNNN", asd);
            //console.log("ACCUM", accum)

            return mongoose.model('Product')
                .find()
                .exec()
                .then(function(products){
                    console.log("Products attached: ", products)
                    var attached = products.map(function(n){n['quantity'] = self.lineItems.filter(function(li){return li.product == n._id;})[0].quantity});
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