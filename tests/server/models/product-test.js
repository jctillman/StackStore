'use strict';
var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');
var async = require('async');

require('../../../server/db/models/product');
require('../../../server/db/models/user');
require('../../../server/db/models/category');
require('../../../server/db/models/review');

var Product = mongoose.model('Product');
var User = mongoose.model('User');
var Category = mongoose.model('Category');
var Review = mongoose.model('Review');

describe('Product model', function () {

    beforeEach('Establish DB connection', function (done) {
        if (mongoose.connection.db) return done();
        mongoose.connect(dbURI, done);
    });

    var catA, catB, catC, catD;

    beforeEach('Create categories', function (done) {
        var tasks = [
            function(cb){Category.create({type: "Dangerous", data: "Yes"}).then(function(cat){catA = cat.id; cb(null, cat)}, function(err){ cb(err, null);});},
            function(cb){Category.create({type: "Dangerous", data: "No"}).then(function(cat){catB = cat.id; cb(null, cat)}, function(err){ cb(err, null);});},
            function(cb){Category.create({type: "Large", data: "Yes"}).then(function(cat){catC = cat.id; cb(null, cat)}, function(err){ cb(err, null);});},
            function(cb){Category.create({type: "Large", data: "No"}).then(function(cat){catD = cat.id; cb(null, cat)}, function(err){ cb(err, null);});}
        ];

        async.parallel(tasks, function(err, results){
            if (!err){
                done();
            }
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
        var testUserPromise;

        beforeEach('Make a product', function(){

            var createProductPromise = function(){
                return Product.create({
                    title: 'some animal',
                    description: 'endangered',
                    photoUrls: ["something", "somethingElse"],
                    splashPhoto: 1,
                    price: 1000,
                    categories: [catA, catC]
            });};
            testProductPromise = createProductPromise();

            var createUserPromise= function(){
                return User.create({
                    email: "thisisanemail@email.com",
                    password: "myfatherisultimusprimse",
            });};
            testUserPromise = createUserPromise();

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
                testProductPromise.then(function(product){
                     product.getCategoryEntry('Dangerous').then(function(data){
                            console.log()
                            expect(data).to.equal('Yes');
                            done();
                    });
                });
            });
        });

        describe('getAverageRating', function(){


            it('should get the average rating when there are no ratings', function(done){
                testProductPromise.then(function(product){
                    testUserPromise.then(function(user){
                        Product.findOne({_id: product.id}, function(err, prod){
                            prod.getAverageRating().then(function(rating){
                                expect(rating).to.equal(undefined);
                                done();
                            });
                        });                                
                    });
                });
            });

            // it('should get the average rating--using async', function(done){



            // });

            it('should get the average rating', function(done){
                testProductPromise.then(function(product){
                    testUserPromise.then(function(user){
                        Review.create({
                            'user': user.id,
                            'product': product.id,
                            'stars': 3,
                            'content': "It was ok."
                        }, function(e, d){
                            Review.create({
                                'user': user.id,
                                'product': product.id,
                                'stars': 3,
                                'content': "It was ok."
                            }, function(e, d){
                                Product.findOne({_id: product.id}, function(err, prod){
                                    prod.getAverageRating().then(function(rating){
                                        expect(rating).to.equal(3);
                                        done();
                                    });
                                });                                
                            });
                        });
                    });
                });
            });


            it('should get the average rating when this involves fractions', function(done){
                testProductPromise.then(function(product){
                    testUserPromise.then(function(user){
                        Review.create({
                            'user': user.id,
                            'product': product.id,
                            'stars': 2,
                            'content': "It was ok."
                        }, function(e, d){
                            Review.create({
                                'user': user.id,
                                'product': product.id,
                                'stars': 3,
                                'content': "It was ok."
                            }, function(e, d){
                                Product.findOne({_id: product.id}, function(err, prod){
                                    prod.getAverageRating().then(function(rating){
                                        expect(rating).to.equal(2.5);
                                        done();
                                    });
                                });                                
                            });
                        });
                    });
                });
            });

        });

    });
});
