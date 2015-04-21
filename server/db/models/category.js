'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema.Types;


var categorySchema = new mongoose.Schema({
    type: {required: true, type: String},
    data: {required: true, type: String}
});


mongoose.model('Category', categorySchema);