'use strict';
var router = require('express').Router();
module.exports = router;


router.use('/order', require('./order'));

router.use('/user', require('./user'));

router.use('/admin', require('./admin'));

router.use('/product', require('./product'));

router.use('/category', require('./category'));


// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});