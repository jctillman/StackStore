'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema.Types;


var productSchema = new mongoose.Schema({
    title: {required: true, type: String},
    description: {required: true, type: String},
    price: {required: true, type: Number},
    categories: [{type: Schema.ObjectId, ref: 'Category'}],
    photoUrls: {required: true, type: String},
    splashPhoto: {required: true, type: Number},
    reviews: [{type: Schema.ObjectId, ref: 'Review'}]
});

// generateSalt, encryptPassword and the pre 'save' and 'correctPassword' operations
// are all used for local authentication security.



productSchema.pre('save', function (next) {


    //TODO.
    //Gives us the default placeholder photo, if we have none.

    //Also sets splash photo to 0 if not specified already.

    //Make sure it belongs to at least one category.

    next();

});

productSchema.method('getSplashPhoto', function () {
    //return the url for splash photo...
});

productSchema.method('getCategoryEntry', function(categoryType){

    //return the right entry if it exists, blank if it does not.
});




mongoose.model('Product', productSchema);