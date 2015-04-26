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

        it('should calculate the total value of the order on request: promo with absolute value', function(done){
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
                //console.log(tiger);
                return Product.create({'title':'Lion', price: 1000, 'description':"aokasdasdasd", categories: [cats[0]]});
            }).then(function(lion){
                prods.push(lion.id);
                //console.log(lion);
                return Promo.create({ code: "TESTSE", amountType: "Absolute", amount: 100, categories: cats });
            }).then(function(){
                return Product.find().exec();
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
                expect(data.finalCost).to.equal(3600);
                expect(data.finalCostWithoutPromo).to.equal(4000);
                done();
            });
        });


        it('should calculate the total value of the order on request: promo with percentage value', function(done){
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
                //console.log(tiger);
                return Product.create({'title':'Lion', price: 1000, 'description':"aokasdasdasd", categories: [cats[0]]});
            }).then(function(lion){
                prods.push(lion.id);
                //console.log(lion);
                return Promo.create({ code: "TESTSE", amountType: "Percentage", amount: 20, categories: cats });
            }).then(function(){
                return Product.find().exec();
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
                expect(data.finalCost).to.equal(3200);
                expect(data.finalCostWithoutPromo).to.equal(4000);
                done();
            });
        });


        it('should calculate the total value of the order on request: promo with percentage value', function(done){
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
                return Product.create({'title':'Tiger', price: 1500, 'description':"aokasdasdasd", categories: [cats[2]]});
            }).then(function(tiger){
                prods.push(tiger.id);
                //console.log(tiger);
                return Product.create({'title':'Lion', price: 1000, 'description':"aokasdasdasd", categories: [cats[1]]});
            }).then(function(lion){
                prods.push(lion.id);
                //console.log(lion);
                return Promo.create({ code: "TEEELM", amountType: "Absolute", amount: 300, categories: [cats[2]] });
            }).then(function(){
                return Product.find().exec();
            }).then(function(){
                return Order.create({
                    lineItems: [
                            { product: prods[0], quantity: 2 },
                            { product: prods[1], quantity: 3 }
                        ],
                    promo: "TEEELM"
                });
            }).then(function(data){
                return data.totalPrice();
            }).then(function(data){
                console.log("asasdaishasdoiajsd", data);
                expect(data.finalCost).to.equal(5400);
                expect(data.finalCostWithoutPromo).to.equal(6000);
                done();
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
