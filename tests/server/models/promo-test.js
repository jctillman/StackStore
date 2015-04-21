'use strict';
var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');
var async = require('async');

require('../../../server/db/models/promo');

var Promo = mongoose.model('Promo');
var Category = mongoose.model('Category');


describe('Product model', function () {

    beforeEach('Establish DB connection', function (done) {
        if (mongoose.connection.db) return done();
        mongoose.connect(dbURI, done);
    });

    beforeEach('Create categories', function (done) {
    	var tasks = [
    		function(cb){Category.create({type: "Dangerous", data: "Yes"}).then(function(cat){cb(null, cat)}, function(err){ cb(err, null);});},
    		function(cb){Category.create({type: "Dangerous", data: "No"}).then(function(cat){cb(null, cat)}, function(err){ cb(err, null);});},
    		function(cb){Category.create({type: "Large", data: "Yes"}).then(function(cat){cb(null, cat)}, function(err){ cb(err, null);});},
    		function(cb){Category.create({type: "Large", data: "No"}).then(function(cat){cb(null, cat)}, function(err){ cb(err, null);});}
    	];

    	async.parallel(tasks, function(err, results){
    		done();
    	});
    });

    afterEach('Clear test database', function (done) {
        clearDB(done);
    });

    it('should exist', function () {
        expect(Promo).to.be.a('function');
    });

    describe('pre-save hook', function(){

    	it('requires categories', function(done){

    		Promo.create({
    			code: "ASD",
    			amountType: "Percentage",
    			amount: 50
    		}, function(err, data){
    			if (err.message === "Must apply to at least one category"){
    				done();
    			}
    		});

    	});

    	it('stops illegal values for percentages', function(done){

    		Promo.create({
    			code: "ASD",
    			amountType: "Percentage",
    			amount: 150
    		}, function(err, data){
    			if(err.message.indexOf("Invalid amount") !== -1){
    				done();
    			}
    		});

    	});


    	it('stops illegal values for absolutes', function(done){

    		Promo.create({
    			code: "ASD",
    			amountType: "Absolute",
    			amount: -50
    		}, function(err, data){
    			if(err.message.indexOf("Invalid amount") !== -1){
    				done();
    			}
    		});

    	});

    });

});