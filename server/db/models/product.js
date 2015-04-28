'use strict';
var mongoose = require('mongoose');
// require('../../../server/db/models/category');
// require('../../../server/db/models/line-item');
// require('../../../server/db/models/order');
var deepPopulate = require('mongoose-deep-populate');


require('./promo');
require('./order');

var Order = mongoose.model('Order');
var Category = mongoose.model('Category');



var Schema = mongoose.Schema.Types;


var productSchema = new mongoose.Schema({
    title: {required: true, type: String},
    description: {required: true, type: String},
    price: {required: true, type: Number},
    categories: [{type: Schema.ObjectId, ref: 'Category'}],
    photoUrl: {type:String, default: 'default.jpg'},
    reviews: [{type: Schema.ObjectId, ref: 'Review'}],
    userVisible: {type: Boolean, default: true}
});

// generateSalt, encryptPassword and the pre 'save' and 'correctPassword' operations
// are all used for local authentication security.


productSchema.pre('save', function (next) {

    if(!this.categoryByName){

        if(((this.categories === undefined) || (this.categories.length < 1)) && !this.categoryByName ){
            var err = new Error("Must have at least one category.");
            next(err);
        }

    }

    next();

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