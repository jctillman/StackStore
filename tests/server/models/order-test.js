'use strict';
var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');

require('../../../server/db/models/order');
require('../../../server/db/models/product');
require('../../../server/db/models/promo');
require('../../../server/db/models/category');

var Order = mongoose.model('Order');
var Product = mongoose.model('Product');
var Promo = mongoose.model('Promo');
var Category = mongoose.model('Category');

describe('Order model', function () {

    beforeEach('Establish DB connection', function (done) {
        if (mongoose.connection.db) return done();
        mongoose.connect(dbURI, done);
    });

    afterEach('Clear test database', function (done) {
        clearDB(done);
    });

    it('should exist', function () {
        expect(Order).to.be.a('function');
    });


    describe('on creation', function () {

        var createOrderPromise;

        beforeEach('Make an order', function(){

            createOrderPromise = function(){

            return Order.create({
                        status: 'wrong'
                    });
        
            };

        });

        it('should calculate the total value of the order on request', function(){

            var cats = [];
            var prods = [];
            var li = [];

            Category.create({'type':'size', 'data': 'large'}).then(function(cat1){
                cats.push(cat1.id);
                //console.log("2nd cat");
                return Category.create({'type':'size', 'data': 'medium'});
            }).then(function(cat2){
                cats.push(cat2.id);
                //console.log("3rd cat");
                return Category.create({'type':'size', 'data': 'small'});
            }).then(function(cat3){
                cats.push(cat3.id);
                //console.log("Tiger");
                return Product.create({'title':'Tiger', price: 1000, 'description':"aokasdasdasd", categories: [cats[0]]});
            }).then(function(tiger){
                prods.push(tiger.id);
                //console.log("Lion");
                return Product.create({'title':'Lion', price: 1000, 'description':"aokasdasdasd", categories: [cats[0]]});
            }).then(function(lion){
                prods.push(lion.id);
                console.log("Promo");
                return Promo.create({ code: "TESTSE", amountType: "Absolute", amount: 100, categories: cats });
            }).then(function(promo){
                console.log("saved promo", promo);
                console.log("Just to delay stuff.")
            }).then(function(){
                console.log("Just work");
            }).then(function(){
                
                return Order.create({
                    lineItems: [
                            { product: prods[0], quantity: 3 },
                            { product: prods[1], quantity: 1 }
                        ],
                    promo: "TESTSE"
                });
            }).then(function(data){
                return data.totalPrice();
            }).then(function(data){
                console.log(data);
            }).then(null, function(err){
                console.log(err);
            });

        });


        it('should throw an error when incorrect status is set', function (done) {
            createOrderPromise().then(function(suc){}, function(err){
                expect(err.message).to.equal('Validation failed');
                done();
            });
        });


    });

        
});
