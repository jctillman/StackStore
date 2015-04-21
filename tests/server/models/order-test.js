var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');

require('../../../server/db/models/order');

var Order = mongoose.model('Order');

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

        it('should throw an error when incorrect status is set', function (done) {
            createOrderPromise().then(function(suc){}, function(err){
                expect(err.message).to.equal('Validation failed');
                done();
            });
        });


    });

        
});
