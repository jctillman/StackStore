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
    //console.log("LIPI", lineItemProductIds);

    return Promo
        .find({code: pr})
        .exec()
        .then(function(promoFound){
            return {promo: promoFound};
        }).then(function(accum){
            return  mongoose.model('Product')
                .find()
                .exec()
                .then(function(p){
                    //console.log("Products attached: ", p)
                    var ret = [];
                    for(var x = 0; x < p.length; x++){
                        ret.push({prod: p[x]})
                        ret[x].quant = self.lineItems[x].quantity;
                        //console.log("immediately afterwards", ret[x]);
                    }
                    //console.log("Attached", ret);
                    return {attached: ret, promo: accum.promo[0]}
                });
        }).then(function(accum){
            console.log("Accum", accum);
            var totalCost = 0;
            var totalCostWithoutPromo = 0;
            for (var x = 0; x < accum.attached.length; x++){
                var product = accum.attached[x].prod;
                var quantity = accum.attached[x].quant;
                var promoApplies = accum.promo.categories.some(function(category){
                        return (product.categories.indexOf(category) !== -1)
                    });
                var baseAddition = product.price * quantity;
                var totalCostWithoutPromo = totalCostWithoutPromo + baseAddition;
                if(promoApplies){
                    if (accum.promo.amountType == "Percentage"){
                        totalCost = totalCost + (baseAddition - (baseAddition / 100) * accum.promo.amount);
                    }else{
                        totalCost = totalCost + (baseAddition - accum.promo.amount * quantity);
                    }
                }else{
                    totalCost = totalCost + baseAddition;
                }
            }

            return {totalCost: totalCost, totalCostWithoutPromo: totalCostWithoutPromo};
        });

};






mongoose.model('Order', orderSchema);