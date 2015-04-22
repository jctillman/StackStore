'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema.Types;

var categorySchema = new mongoose.Schema({
    type: {required: true, type: String},
    data: {required: true, type: String}
    order: {required: true, type: Number, default: 0}
});


mongoose.model('Category', categorySchema);