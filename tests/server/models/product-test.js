'use strict';
var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');

require('../../../server/db/models/product');
require('../../../server/db/models/user');
require('../../../server/db/models/category');

var Product = mongoose.model('Product');
var User = mongoose.model('User');
var Category = mongoose.model('Category');

describe('Product model', function () {

    beforeEach('Establish DB connection', function (done) {
        if (mongoose.connection.db) return done();
        mongoose.connect(dbURI, done);
    });

    var catA, catB, catC, catD;

    beforeEach('Create categories', function (done) {
        Category.create({type: "Dangerous", data: "Yes"}).then(function(cat){
            catA = cat.id;
            Category.create({type: "Dangerous", data: "No"}).then(function(cat){
                catB = cat.id;
                Category.create({type: "Large", data: "Yes"}).then(function(cat){
                    catC = cat.id;
                     Category.create({type: "Large", data: "No"}).then(function(cat){
                        catD = cat.id;
                        done();
                    });
                });
            });
        });
    });

    afterEach('Clear test database', function (done) {
        clearDB(done);
    });

    it('should exist', function () {
        expect(Product).to.be.a('function');
    });


    describe('on creation', function () {

        var testProductPromise;
        var testProductPromiseNoCategory;

        beforeEach('Make a product', function(){

            var createProductPromise = function(){

            return Product.create({
                        title: 'some animal',
                        description: 'endangered',
                        price: 1000,
                        categories: [catA]
                    });
      
        };

            testProductPromise = createProductPromise();

            testProductPromiseNoCategory = Product.create({
                        title: 'some animal',
                        description: 'endangered',
                        price: 1000
            });


        });


        it('should set a default photoUrl if there is none', function (done) {


            testProductPromise.then(function(product){
                expect(product.photoUrls).to.have.length(1);
                done();
            });
        });

        it('should set splashPhoto index to 0 if not specified', function (done) {
           testProductPromise.then(function(product){
            expect(product.splashPhoto).to.equal(0);
            done();
           });
        });

        it('should throw an error when no categories are set', function (done) {
            testProductPromiseNoCategory.then(function(success){}, function(err){
                expect(err.message).to.equal('Must have at least one category.');
                done();
            });
        });

    });



    describe('Schema methods', function () {

        var testProductPromise;

        beforeEach('Make a product', function(){

            var createProductPromise = function(){

            return Product.create({
                        title: 'some animal',
                        description: 'endangered',
                        photoUrls: ["something", "somethingElse"],
                        splashPhoto: 1,
                        price: 1000,
                        categories: [catA, catC]
                    }); 

            };


            testProductPromise = createProductPromise();
        });


        describe('getSplashPhoto', function(){

            it('should return the photo at specified index', function(done){
                testProductPromise.then(function(product){
                    expect(product.getSplashPhoto()).to.equal('somethingElse');
                    done();
                });
            });

        })


        describe('getCategoryEntry', function(){
            it('should return the entries with a particular category', function(done){
                console.log("In");
                testProductPromise.then(function(product){
                        //console.log("In more");
                        //console.log("Returning...", product.getCategoryEntry('Dangerous'));
                        product.getCategoryEntry('Dangerous').then(function(data){
                            expect(data).to.equal('Yes');
                            
                            done();
                    });
                });
            });
        });

    });
        
});
