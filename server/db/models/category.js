'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema.Types;
var deepPopulate = require('mongoose-deep-populate');
var q = require('q');

var categorySchema = new mongoose.Schema({
    type: {required: true, type: String},
    data: {required: true, type: String},
    order: {required: true, type: Number, default: 0}
});

categorySchema.plugin(deepPopulate);


categorySchema.methods.saveAsync = function () {
   return q.ninvoke(this,'save');
};

mongoose.model('Category', categorySchema);