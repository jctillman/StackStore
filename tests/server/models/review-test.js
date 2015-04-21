var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');
var async = require('async');

require('../../../server/db/models/review');
require('../../../server/db/models/user');
require('../../../server/db/models/product');
require('../../../server/db/models/category');

var Review = mongoose.model('Review');
var User = mongoose.model('User');
var Product = mongoose.model('Product');
var Category = mongoose.model('Category');

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

        var user, product;

        beforeEach('make user and product', function(done){

            var tasks = [
                function(cb){
                    User.create({'password':'password', 'email':"valid@valid.com"}).then(function(dat){
                        cb(null, dat);
                    });
                },
                function(cb){
                    Product.create({
                        title:'Lion',
                        description: 'Nala',
                        price: 20000,
                        categories: [catA]
                    }).then(function(dat){
                        cb(null, dat);
                    });
                }
            ];

            async.parallel(tasks, function(err, data){
                user = data[0].id;
                product = data[1].id;
                done();
            });

        });

        it('can be saved', function(done){
            Review.create({
                user: user,
                product: product,
                stars: 5,
                content: "We have some content"
            }, function(err, data){
                Review.find({'stars': 5}, function(err,data){
                    expect(JSON.stringify(data[0].product) === JSON.stringify(product)).to.equal(true);
                    expect(JSON.stringify(data[0].user) === JSON.stringify(user)).to.equal(true);
                    done();
                });

            });
        });


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