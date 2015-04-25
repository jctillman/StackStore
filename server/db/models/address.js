'use strict';
var mongoose = require('mongoose');

var addressSchema = new mongoose.Schema({
    line1: {type: String},
    line2: String,
    state: {type: String},
    city: {type: String},
    country: {type: String},
    zip: {type: String}
});

module.exports = addressSchema;
