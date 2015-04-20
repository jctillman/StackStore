var mongoose = require('mongoose');
var Schema = mongoose.Schema.Types;


var validationMethod = function(status){
    return true; //Change this. 
}

var orderSchema = new mongoose.Schema({
    user: {type: ObjectId, ref: 'User'},
    session: {type: String},
    lineItems: {type: ObjectId, ref: 'LineItem'},
    paymentMethod: {type: ObjectId, ref: 'PaymentMethod'},
    shippingAddress: {type: ObjectId, ref: 'Address'},
    dateOrdered: {type: Date},
    dateShipped: {type: Date},
    dateClosed: {type: Date},
    status: {type: String, default: "Cart", required: true, validate: [validationMethod, 'incorrect status']}
});

// generateSalt, encryptPassword and the pre 'save' and 'correctPassword' operations
// are all used for local authentication security.



mongoose.model('Order', orderSchema);