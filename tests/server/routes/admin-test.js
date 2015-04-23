'use strict';

require('../../../server/db/models/product');
require('../../../server/db/models/user');
require('../../../server/db/models/address');
require('../../../server/db/models/category');
require('../../../server/db/models/payment-method');
require('../../../server/db/models/order');
require('../../../server/db/models/review');
require('../../../server/db/models/lineItem');

var mongoose = require('mongoose'),
		expect = require('chai').expect,
	
		dbURI = 'mongodb://localhost:27017/testingDB',
		clearDB = require('mocha-mongoose')(dbURI),

		app = require('../../../server/app'),

		request = require('supertest'),
		agent = request.agent(app),

		Product = mongoose.model('Product'),
	  Category = mongoose.model('Category'),
	  User = mongoose.model('User'),
	  Address = mongoose.model('Address'),
	  Order = mongoose.model('Order'),
	  PaymentMethod = mongoose.model('PaymentMethod'),
	  Review = mongoose.model('Review'),
	  LineItem = mongoose.model('LineItem');


describe('Admin routes', function(){

	var product;

	beforeEach('Establish DB connection', function (done) {
	    if (mongoose.connection.db) return done();
	    mongoose.connect(dbURI, done);
	});

	afterEach('Clear test database', function (done) {
	    clearDB(done);
	});

		describe('Admin authentication', function(){

			it('should not allow access from non-admin users', function(done){
				agent
					.get('/api/admin')
					.expect(401)
					done();
			});
			
			it('or allow them to access any priveleged CRUD operations', function(done){

				product = new Product(
					{title: 'something', description: 'something else', price: 2}
				);

				product.save(function(err){
						agent
						.get('/api/admin/product/' + product._id)
						.expect(401)
						done();
				})
			
			});		

		});

		describe('Admin CRUD operations', function(){

			var authenticatedUser;

			beforeEach('log-in as admin', function(done){
				authenticatedUser = new User({
					email: 'routeTesting@fsa.com',
					password: 'testing',
					admin: true
				});

				authenticatedUser.save(function(err){
					agent
					.get('/login')
					done();
				});

			});

					describe('Admin product routes', function(){

						describe('GET /products/:productId', function(){

							it('returns a product with populated fields', function(done){



								Category.create({
									type: 'Animal',
									data: 'an animal',
									order: 1
								}).then(function(category){
									Product.create({
										title: 'Product',
										description: 'desc',
										price: 2,
										categories: category._id
									}, function(err, product){
										agent
										.get('/api/admin/product' + product._id)
										//is this working how I think it is? bodies field seems to be empty
										.expect(product)
										.expect(category)
										console.log(agent.get('/api/admin/product' + product._id)._bodies);
										done();
									})

								});

							});

						});

				})


		});







});