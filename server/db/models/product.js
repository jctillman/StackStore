'use strict';
var mongoose = require('mongoose');
require('../../../server/db/models/category');
require('../../../server/db/models/line-item');
require('../../../server/db/models/order');
var deepPopulate = require('mongoose-deep-populate');


var Category = mongoose.model('Category');
var LineItem = mongoose.model('LineItem');
var Order = mongoose.model('Order');

var Schema = mongoose.Schema.Types;


var productSchema = new mongoose.Schema({
    title: {required: true, type: String},
    description: {required: true, type: String},
    price: {required: true, type: Number},
    categories: [{type: Schema.ObjectId, ref: 'Category'}],
    photoUrls: [String],
    splashPhoto: {default: 0, type: Number},
    reviews: [{type: Schema.ObjectId, ref: 'Review'}],
    userVisible: {type: Boolean, default: true}
});

// generateSalt, encryptPassword and the pre 'save' and 'correctPassword' operations
// are all used for local authentication security.

productSchema.statics.ProductToOrder = function(productId, orderId, cb){

    Order.findById(orderId)
        .populate('lineItems')
        .exec()
        .then(function(data){

            var matchingLineItems = data.lineItems.filter(function(lineItem){return lineItem.product == productId;});
            console.log("GOt here");
            if (matchingLineItems.length==1){
                console.log(matchingLineItems[0]);
                LineItem.update(
                    {_id: matchingLineItems[0].id},
                    {quantity: (matchingLineItems[0].quantity + 1)},
                    {},
                    cb
                    );
            }else{
            LineItem.create({product: productId}, function(err, data){
                Order.update(
                        {_id: orderId},
                        {$push : {lineItems: data.id}},
                        {},
                        cb
                    ); 
                });
            }
        }, null)
        .then(null, function(err){cb("Error", null)});
    }

productSchema.pre('save', function (next) {

    if(this.photoUrls === null || this.photoUrls.length === 0){
        this.photoUrls.push("DEFAULT TO BE SET."); //TO DO!!!
    }

    if(!this.categoryByName){

        if(((this.categories === undefined) || (this.categories.length < 1)) && !this.categoryByName ){
            var err = new Error("Must have at least one category.");
            next(err);
        }

    }

    next();

});

productSchema.method('getSplashPhoto', function () {
    return this.photoUrls[this.splashPhoto];
    //return the url for splash photo...
});

productSchema.method('getCategoryEntry', function(categoryType){
    
     return this.model('Product')
     .find({_id: this.id})
     .populate('categories')
     .exec().then(function(product){
         return product[0].categories.filter(function(category){
             return category.type === categoryType;
      })[0].data;

    });
     
});

productSchema.method('getAverageRating', function(cb){

    return this.model('Product')
    .find({_id: this.id})
    .populate('reviews')
    .exec().then(function(product){
        if (product[0].reviews.length !== 0){
            return product[0].reviews.reduce(function(build, a){
                return build + a.stars;
            }, 0 ) / product[0].reviews.length;
        }else{
            return undefined;
        }
    });

});

mongoose.model('Product', productSchema);