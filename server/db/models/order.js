'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema.Types;

var potentialStatuses = ['complete', 'in progress', 'cancelled', 'cart'];

var validationMethod = function(status){
    if(potentialStatuses.indexOf(status) === -1){
        return false;
    }
    return true; 
};

var orderSchema = new mongoose.Schema({
    user: {type: Schema.ObjectId, ref: 'User'},
    session: {type: String},
    lineItems: [{type: Schema.ObjectId, ref: 'LineItem'}],
    paymentMethod: {type: Schema.ObjectId, ref: 'PaymentMethod'},
    shippingAddress: {type: Schema.ObjectId, ref: 'Address'},
    dateOrdered: {type: Date},
    dateShipped: {type: Date},
    dateClosed: {type: Date},
    status: {type: String, default: "cart", required: true, validate: [validationMethod, 'incorrect status']}
});

//TODO: Add testing
// orderSchema.method('addProduct', function(productId){
//     var orderId = this.id;
//     LineItem.create({product: productId}, function(err, data){
//         this.model('Order').update(
//             {_id: OrderId},
//             {$push: {lineItems: data.id}},
//             function(err, data){

//             }
//         );
//     });
// });


mongoose.model('Order', orderSchema);