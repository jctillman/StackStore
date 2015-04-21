'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema.Types;


var productSchema = new mongoose.Schema({
    title: {required: true, type: String},
    description: {required: true, type: String},
    price: {required: true, type: Number},
    categories: [{type: Schema.ObjectId, ref: 'Category'}],
    photoUrls: [String],
    splashPhoto: {default: 0, type: Number},
    reviews: [{type: Schema.ObjectId, ref: 'Review'}]
});

// generateSalt, encryptPassword and the pre 'save' and 'correctPassword' operations
// are all used for local authentication security.



productSchema.pre('save', function (next) {

    if(this.photoUrls === null || this.photoUrls.length === 0){
        this.photoUrls.push("DEFAULT TO BE SET."); //TO DO!!!
    }

    if((this.categories === undefined) || (this.categories.length < 1)){
        var err = new Error("Must have at least one category.");
        next(err);
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

productSchema.virtual('averageRating').get(function(){
    var sum;

    if(this.reviews === undefined || this.reviews.length === 0){
        return 0;
    }

    for(var i = 0; i < this.reviews.length; i++){
        sum += this.review[i].stars;
    }
    return sum/this.reviews.length;

});



mongoose.model('Product', productSchema);