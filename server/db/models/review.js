'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema.Types;

var validationMethod = function(content){
    return (content.length > 5);
};

var reviewSchema = new mongoose.Schema({
    user: {type: Schema.ObjectId, ref: 'User', required: true},
    product: {type: Schema.ObjectId, ref: 'Product', required: true},
    stars: {type: Number, max: 5, min: 1, required: true},
    content: {type: String, required: true, validate: [validationMethod, 'not the right length']}
});



mongoose.model('Review', reviewSchema);