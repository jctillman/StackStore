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

    // this.populate('reviews', function(err, populated){
        
    //     var sum;
    //     if(populated.reviews === undefined || populated.reviews.length === 0){
    //         cb(0);
    //         return;
    //     }
    //     cb(err + " , " + populated);
    //     for(var i = 0; i < populated.reviews.length; i++){
    //         sum += populated.review[i].stars;
    //     }
    //     cb( sum/populated.reviews.length );

    // });
});



mongoose.model('Product', productSchema);