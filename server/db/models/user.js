'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');
var Schema = mongoose.Schema.Types;
var paymentSchema = require('./payment-method');
var addressSchema = require('./address');

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
};


var userSchema = new mongoose.Schema({

    email: {
        unique: true,
        type: String,
        validate: [validateEmail, 'Please give a valid email address']
    },
 
    password: {
        type: String
    },

    salt: {
        type: String
    },

    twitter: {
        id: String,
        username: String,
        token: String,
        tokenSecret: String
    },

    facebook: {
        id: String
    },

    google: {
        id: String
    },

    name: {
        first: String,
        middle: String,
        last: String,
    },

    orders: [{type: Schema.ObjectId, ref: 'Order'}],

    cart: {type: Schema.ObjectId, ref: 'Order'},

    addresses: [addressSchema],

    reviews: [{type: Schema.ObjectId, ref: 'Review'}],

    admin: {default: false, required: true, type: Boolean},

    

});

// generateSalt, encryptPassword and the pre 'save' and 'correctPassword' operations
// are all used for local authentication security.

var isEmptyOfId = function(obj) {
    if (obj.id && obj.id.length > 2){return false;}else{return true;}
};

var generateSalt = function () {
    return crypto.randomBytes(16).toString('base64');
};

var encryptPassword = function (plainText, salt) {
    var hash = crypto.createHash('sha1');
    hash.update(plainText);
    hash.update(salt);
    return hash.digest('hex');
};

userSchema.pre('save', function (next) {
 
    if (this.isModified('password')) {
        this.salt = this.constructor.generateSalt();
        this.password = this.constructor.encryptPassword(this.password, this.salt);
    }

    if (isEmptyOfId(this.google)  && isEmptyOfId(this.facebook) && !this.password){
        var error = new Error("Password required.");
        next(error);
    }

    next();

});

userSchema.statics.generateSalt = generateSalt;
userSchema.statics.encryptPassword = encryptPassword;

userSchema.method('correctPassword', function (candidatePassword) {
    return encryptPassword(candidatePassword, this.salt) === this.password;
});

//TODO: Add test for this method.
userSchema.method('hasCart', function(cb){
    return (!!this.cart);
});





mongoose.model('User', userSchema);