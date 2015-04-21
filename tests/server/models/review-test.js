var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');

require('../../../server/db/models/review');

var Review = mongoose.model('Review');

describe('Review model', function () {

    beforeEach('Establish DB connection', function (done) {
        if (mongoose.connection.db) return done();
        mongoose.connect(dbURI, done);
    });

    afterEach('Clear test database', function (done) {
        clearDB(done);
    });

    it('should exist', function () {
        expect(Review).to.be.a('function');
    });

    describe('can save a review', function(){
       //TODO: Add this.
       // it('and retrive all the data', function(done){
       //     Review.create({});
       // });

    });

    describe('validates', function(){

        it('and throws an error on not being given enough content', function(done){
            Review.create({content: "c"}).then(function(succ){}, function(err){
                if (err.errors.content.message == "Incorrect length"){
                    done();
                }
            });
        });

        it('and throws an error on not being too much content', function(done){

            for(var x = 0, tooLong = ""; x < 500; x++){tooLong = tooLong + "thisistoolong";}

            Review.create({content: tooLong}).then(function(succ){}, function(err){
                if (err.errors.content.message == "Incorrect length"){
                    done();
                }
            });
        });


    });


});