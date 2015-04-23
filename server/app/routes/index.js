'use strict';
var router = require('express').Router();
module.exports = router;

router.use('/list', require('./list'));

router.use('/order', require('./order'));

router.use('/admin', require('./admin'));

router.use('/product', require('./product'));

router.use('/members', require('./members'));

// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});