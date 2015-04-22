


var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');
var async = require('async');
var babel = require('gulp-babel');
var gulp = require('gulp');
var runSeq = require('run-sequence');
var plumber = require('gulp-plumber');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var livereload = require('gulp-livereload');
var minifyCSS = require('gulp-minify-css');
var ngAnnotate = require('gulp-ng-annotate');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var jshint = require('gulp-jshint');
var mocha = require('mocha');
var chair = require('chai');
var karma = require('karma').server;
var path = require('path');


require('./server/db/models/product');
require('./server/db/models/user');
require('./server/db/models/category');
require('./server/db/models/review');

var DATABASE_URI = require(path.join(__dirname, './server/env')).DATABASE_URI;

console.log(DATABASE_URI);
var mongoose = require('mongoose');
var clearDB = require('mocha-mongoose')(DATABASE_URI);


var Category = mongoose.model('Category');
var Review = mongoose.model('Review');

console.log("Seed started...");




beforeEach('Establish DB connection', function (done) {
    if (mongoose.connection.db) return done();
    mongoose.connect(DATABASE_URI).connection;
    done();
});

beforeEach('Clear test database', function (done) {
    clearDB(done);
});


describe('function', function(done){



    //it('ok', function(done){
        //clearDB(done);
    //})

    describe(",", function(){

        var catA, catB, catC, catD;

        it ('categories', function(done){

            console.log("asdasd");
            var iter = 0;

            var tasks = [
                function(cb){Category.create({type: "Dangerous", data: "Yes"}).then(function(cat){catA = cat.id; cb(null, cat)}, function(err){ cb(err, null);});},
                function(cb){Category.create({type: "Dangerous", data: "No"}).then(function(cat){catB = cat.id; cb(null, cat)}, function(err){ cb(err, null);});},
                function(cb){Category.create({type: "Large", data: "Yes"}).then(function(cat){catC = cat.id; cb(null, cat)}, function(err){ cb(err, null);});},
                function(cb){Category.create({type: "Large", data: "No"}).then(function(cat){catD = cat.id; cb(null, cat)}, function(err){ cb(err, null);});}
            ];

            async.parallel(tasks, function(err, results){

                function de(d,e){
                    console.log("hey");
                    iter++;
                    expect('something').to.equal('something');
                    if (iter > 3){done();}
                }

                Product.create({
                            title: 'Tiger',
                            description: 'An endangered freaking tiger.',
                            price: 1000,
                            categories: [catA, catC]
                    }, de);

                Product.create({
                        title: 'Ocelot',
                        description: 'An ocelot.',
                        price: 1000,
                        categories: [catA, catC]
                }, de);



                Product.create({
                        title: 'Turtle',
                        description: 'Are any turtles endangered?',
                        price: 1000,
                        categories: [catB, catD]
                })


                Product.create({
                        title: 'Nessie',
                        description: 'The Loche Ness Monster',
                        price: 1000,
                        categories: [catA, catD]
                }, de);

                Product.create({
                        title: 'Dodo',
                        description: 'Really, really endangered.',
                        price: 1000,
                        categories: [catB, catD]
                }, de);
            });
        });
    });
//}, 1000);

});




// /*

// This seed file is only a placeholder. It should be expanded and altered
// to fit the development of your application.

// It uses the same file the server uses to establish
// the database connection:
// --- server/db/index.js

// The name of the database used is set in your environment files:
// --- server/env/*

// This seed file has a safety check to see if you already have users
// in the database. If you are developing multiple applications with the
// fsg scaffolding, keep in mind that fsg always uses the same database
// name in the environment files.

// Refer to the q documentation for why and how q.invoke is used.

// */

// var mongoose = require('mongoose');
// var connectToDb = require('./server/db');
// var User = mongoose.model('User');
// var q = require('q');
// var chalk = require('chalk');

// var getCurrentUserData = function () {
//     return q.ninvoke(User, 'find', {});
// };

// var seedUsers = function () {

//     var categories = [
//         {type: "Subphylum", data: "Amphibia", order: 10},
//         {type: "Subphylum", data: "Sauropsida", order: 10},
//         {type: "Subphylum", data: "Synapsida", order: 10},
//         {type: "Diet", data: "Carnivorous", order: 11},
//         {type: "Diet", data: "Herbivorous", order: 11},
//         {type: "Diet", data: "Omnivorous", order: 11},
//         {type: "Level of Danger", data: "High", order: 12},
//         {type: "Level of Danger", data: "Medium", order: 12},
//         {type: "Level of Danger", data: "Low", order: 12}
//     ];

//     var users = [
//         {
//             email: 'testing@fsa.com',
//             password: 'password'
//         },
//         {
//             email: 'obama@gmail.com',
//             password: 'potus'
//         }
//     ];

//     return q.invoke(User, 'create', users);
//     return q.invoke(Category, 'create', categories);

// };

// connectToDb.then(function () {
//     getCurrentUserData().then(function (users) {
//         if (users.length === 0) {
//             return seedUsers();
//         } else {
//             console.log(chalk.magenta('Seems to already be user data, exiting!'));
//             process.kill(0);
//         }
//     }).then(function () {
//         console.log(chalk.green('Seed successful!'));
//         process.kill(0);
//     }).catch(function (err) {
//         console.error(err);
//         process.kill(1);
//     });
// });