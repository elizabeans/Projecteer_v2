var express = require('express');
var passport = require('passport');
var auth = require('./helper/auth');
var Account = require('../models/account');
var router = express.Router();


router.get('/', function (req, res) {
    res.status(200).send({});
});

// test route for seeing if authentication is working....
router.get('/app/authenticated', auth.ensureAuthenticated, function (req, res) {
    console.log("user is authenticated");
    res.status(200).send({});
});


module.exports = router;