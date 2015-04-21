var mongoose = require('mongoose');
var Schema = mongoose.Schema.Types;

var addressSchema = new mongoose.Schema({
    line1: {type: String, required: true},
    line2: String,
    state: {type: String, required: true},
    city: {type: String, required: true},
    country: {type: String, required: true},
    zip: {type: String, required: true}
});


mongoose.model('Address', addressSchema);