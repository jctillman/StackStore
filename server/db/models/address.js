'use strict';
var mongoose = require('mongoose');

var addressSchema = new mongoose.Schema({
    line1: {type: String, required: true},
    line2: String,
    state: {type: String},
    city: {type: String, required: true},
    country: {type: String, required: true},
    zip: {type: String, required: true}
});

module.exports = addressSchema;
