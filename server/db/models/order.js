'use strict';
var Promise= require('bluebird');
var stripe = require("stripe")("sk_test_NNsgISD8Diz6UXQreTb0loAk");
var mongoose = Promise.promisifyAll(require('mongoose'));
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
        type: {type: String},
        stripeToken: {type: String},
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
    status: {type: String, default: "cart", required: true, enum: ['cart', 'purchased', 'in progress', 'cancelled']},
    finalCost: Number,
    finalCostWithoutPromo: Number,
    finalCostCreatedDate: Date,
    promo: String
});
orderSchema.plugin(deepPop, {});


orderSchema.methods.totalPrice = function(){

    this.finalCostCreatedDate = new Date();
    console.log("Payment method", this.paymentMethod.dateSaved);
    console.log("Payment method", this.paymentMethod.type);
    console.log("Payment method", this.paymentMethod.stripeToken);
    var self = this;
    var pr = this.promo;
    var lineItemProductIds = self.lineItems.map(function(n){return n.product;});

    return Promo
        .find({code: pr})
        .exec()
        .then(function(promoFound){
            return {promo: promoFound};
        }).then(function(accum){
            return  mongoose.model('Order')
                .find({'_id': self._id})
                .populate('lineItems.product')
                .exec()
                .then(function(p){
                    return {attached: p[0], promo: accum.promo[0]}
                });
        }).then(function(accum){
            console.log("Accum", accum);
            var totalCost = 0;
            var totalCostWithoutPromo = 0;
            for (var x = 0; x < accum.attached.lineItems.length; x++){
                var product = accum.attached.lineItems[x].product;
                var quantity = accum.attached.lineItems[x].quantity;
                var promoApplies = accum.promo && accum.promo.categories.some(function(category){
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
        }).then(function(values){
            self.finalCost = values.totalCost;
            self.finalCostWithoutPromo = values.totalCostWithoutPromo;
            self.finalCostCreatedDate = new Date();
            return self.saveAsync().then(function(a){return a[0]});
        }).then(null, function(err){
            console.log(err);
        });

};


orderSchema.methods.purchase = function(cb){
    console.log("In purchase...");
    var self = this;
    var diff = (new Date() - this.finalCostCreatedDate );
    console.log(diff);

    console.log(this.paymentMethod);

    if ( diff < 1000 * 60){
        var stripeToken = this.paymentMethod.stripeToken;
        console.log("Stripetoken", stripeToken);
        var charge = stripe.charges.create({
            amount: this.finalCost,
            currency: "USD",
            source: stripeToken
        }, function(err, data){
            console.log("Back from stripe...")
            console.log("err", err);
            console.log("data", data);
            if (err) { cb(err, data); return; }
            
            self.status = 'purchased';
            self.save(cb);
        });
    }else{
        cb("Waited too long.", nul);
    }

}






mongoose.model('Order', orderSchema);