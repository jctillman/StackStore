
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
    if(this.photoUrls.length===0){
        this.photoUrls[0]="DEFAULT TO BE SET." //TO DO!!!
    }

    if(this.splashPhoto===null){
        this.splashPhoto=0;
    }

    if(this.categories.length<1){
        var err = new Error("Must have at least one category.");
    }
    //TODO.
    //Gives us the default placeholder photo, if we have none.

    //Also sets splash photo to 0 if not specified already.

    //Make sure it belongs to at least one category.

    next(err);

});

productSchema.method('getSplashPhoto', function () {
    return this.photoUrls[this.splashPhoto];
    //return the url for splash photo...
});

productSchema.method('getCategoryEntry', function(categoryType){
    
    return this.categories.filter(function(category){
        return category.type===categoryType;
    })[0].data;

    //return the right entry if it exists, blank if it does not.
});




mongoose.model('Product', productSchema);